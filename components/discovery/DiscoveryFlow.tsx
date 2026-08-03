"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { DISCOVERY_QUESTIONS } from "@/config/discoveryQuestions";
import {
  completeAssessment,
  getDraftAssessment,
  saveDraftAssessment,
} from "@/lib/firestore/discovery";
import { analyzeDiscovery } from "@/lib/ai/analyzeDiscoveryAction";
import { ChildPicker } from "@/components/shared/ChildPicker";
import { ProfileStep } from "@/components/discovery/ProfileStep";
import { QuestionnaireStep } from "@/components/discovery/QuestionnaireStep";
import { ReviewStep } from "@/components/discovery/ReviewStep";
import { AnalyzingStep } from "@/components/discovery/AnalyzingStep";
import type {
  AssessmentAnswer,
  AssessmentAnswerValue,
  AssessmentChildProfile,
} from "@/types/discoveryAssessment";

type Step = "child" | "profile" | "questions" | "review" | "analyzing";

const DOMAIN_BY_QUESTION_ID = new Map(DISCOVERY_QUESTIONS.map((q) => [q.id, q.domain]));

export function DiscoveryFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, selectedChild, childProfiles, selectChild } = useAuth();

  // History's "Duplicate" action links here as /discovery?childId=xyz — that
  // child's draft (seeded from the duplicated report) is what the parent
  // actually came here for, which may not match whichever child happens to
  // be globally selected on the dashboard. When present and valid, it wins
  // over the dashboard's selection and skips straight past the picker.
  const requestedChildId = searchParams.get("childId");
  const requestedChildIsValid =
    !!requestedChildId && childProfiles.some((c) => c.id === requestedChildId);

  const [step, setStep] = useState<Step>(requestedChildIsValid ? "profile" : "child");
  const [selectedChildId, setSelectedChildId] = useState<string | null>(
    requestedChildIsValid ? requestedChildId : (selectedChild?.id ?? null)
  );
  const [profile, setProfile] = useState<Partial<AssessmentChildProfile>>({});
  const [answers, setAnswers] = useState<Record<string, AssessmentAnswerValue>>({});
  const [questionnaireStartIndex, setQuestionnaireStartIndex] = useState(0);
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  // Keep the dashboard's globally-selected child in sync when we arrived
  // here via a specific childId link, so ChildSelector etc. reflect it too.
  useEffect(() => {
    if (requestedChildIsValid && requestedChildId) {
      selectChild(requestedChildId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedChildIsValid, requestedChildId]);

  // Resume an in-progress draft when a child is picked.
  useEffect(() => {
    if (!selectedChildId) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: resets draft-loading state when the selected child changes, before kicking off the resume fetch. Same accepted pattern as lib/hooks/useAsyncData.ts.
    setDraftLoaded(false);
    getDraftAssessment(selectedChildId)
      .then((draft) => {
        if (cancelled || !draft) {
          if (!cancelled) setDraftLoaded(true);
          return;
        }
        setProfile(draft.childProfileSnapshot ?? {});
        const restored: Record<string, AssessmentAnswerValue> = {};
        for (const answer of draft.answers ?? []) {
          restored[answer.questionId] = answer.value;
        }
        setAnswers(restored);
        setDraftLoaded(true);
      })
      .catch(() => setDraftLoaded(true));
    return () => {
      cancelled = true;
    };
  }, [selectedChildId]);

  const persistDraft = useCallback(
    async (nextAnswers: Record<string, AssessmentAnswerValue>, nextProfile: Partial<AssessmentChildProfile>) => {
      if (!user || !selectedChildId) return;
      const list: AssessmentAnswer[] = Object.entries(nextAnswers).map(([questionId, value]) => ({
        questionId,
        domain: DOMAIN_BY_QUESTION_ID.get(questionId) ?? "Observation",
        value,
      }));
      await saveDraftAssessment(user.uid, selectedChildId, list, nextProfile);
    },
    [user, selectedChildId]
  );

  function handleAnswer(questionId: string, _domain: AssessmentAnswer["domain"], value: AssessmentAnswerValue) {
    const next = { ...answers, [questionId]: value };
    setAnswers(next);
    void persistDraft(next, profile);
  }

  function handleProfileContinue(nextProfile: AssessmentChildProfile) {
    setProfile(nextProfile);
    void persistDraft(answers, nextProfile);
    setStep("questions");
  }

  async function handleSaveDraft() {
    setSaving(true);
    try {
      await persistDraft(answers, profile);
    } finally {
      setSaving(false);
    }
  }

  async function handleAnalyze() {
    if (!user || !selectedChildId) return;
    setAnalyzeError(null);
    setStep("analyzing");
    try {
      const answerList: AssessmentAnswer[] = Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        domain: DOMAIN_BY_QUESTION_ID.get(questionId) ?? "Observation",
        value,
      }));
      const fullProfile = profile as AssessmentChildProfile;
      const analysis = await analyzeDiscovery(fullProfile, answerList);
      const reportId = await completeAssessment(user.uid, selectedChildId, answerList, analysis);
      router.push(`/discovery/report/${reportId}`);
    } catch (err) {
      setAnalyzeError(
        err instanceof Error ? err.message : "Analisis gagal. Coba lagi sebentar."
      );
      setStep("review");
    }
  }

  if (!selectedChildId || step === "child") {
    return (
      <ChildPicker
        selectedChildId={selectedChildId}
        onSelect={setSelectedChildId}
        onContinue={() => setStep("profile")}
        stepLabel="Langkah 1 dari 4"
        description="Pilih profil anak yang akan dinilai dalam sesi Discovery ini."
        emptyStateDescription="Tambahkan profil anak dulu di dashboard sebelum memulai Discovery."
      />
    );
  }

  if (!draftLoaded) {
    return (
      <div className="h-64 animate-pulse rounded-[28px] bg-surface shadow-sm shadow-black/5" />
    );
  }

  if (step === "profile") {
    return (
      <ProfileStep
        childId={selectedChildId}
        initialProfile={profile}
        onBack={() => setStep("child")}
        onContinue={handleProfileContinue}
      />
    );
  }

  if (step === "questions") {
    return (
      <QuestionnaireStep
        answers={answers}
        initialIndex={questionnaireStartIndex}
        onAnswer={handleAnswer}
        onBack={() => setStep("profile")}
        onComplete={() => setStep("review")}
      />
    );
  }

  if (step === "analyzing") {
    return <AnalyzingStep />;
  }

  return (
    <ReviewStep
      answers={answers}
      saving={saving}
      analyzeError={analyzeError}
      onEditAt={(index) => {
        setQuestionnaireStartIndex(index);
        setStep("questions");
      }}
      onBack={() => setStep("questions")}
      onSaveDraft={handleSaveDraft}
      onAnalyze={handleAnalyze}
    />
  );
}
