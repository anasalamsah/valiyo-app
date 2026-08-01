"use server";

import { GoogleGenAI } from "@google/genai";
import { computeDomainScores, DOMAIN_LABEL_ID } from "@/lib/ai/domainLabels";
import { buildDiscoveryPrompt } from "@/lib/ai/prompts";
import { generateFallbackAnalysis } from "@/lib/ai/fallbackAnalysis";
import { generatePersonalizedRoadmap } from "@/lib/ai/roadmapGenerator";
import type { AssessmentAnswer, AssessmentChildProfile, DiscoveryAssessment } from "@/types/discoveryAssessment";

type AnalysisResult = Omit<
  DiscoveryAssessment,
  "id" | "uid" | "childId" | "status" | "answers" | "createdAt" | "updatedAt" | "completedAt" | "pdfUrl"
>;

/**
 * Server Action: Observation Answers → domain scores → structured prompt →
 * Gemini → structured JSON. Runs entirely server-side, so GEMINI_API_KEY
 * never reaches the browser. Falls back to the deterministic pattern
 * analysis (lib/ai/fallbackAnalysis.ts) whenever the key is missing or the
 * Gemini call fails for any reason — a parent should never see an error
 * screen here, only a slightly less personalized (but still real) report.
 *
 * This function only computes the analysis; it does NOT write to
 * Firestore. The caller (client-side, already-authenticated) persists the
 * result via lib/firestore/discovery.ts's completeAssessment(), consistent
 * with how every other write in this app goes through the client SDK
 * under an active Firebase Auth session (see firestore.rules).
 */
export async function analyzeDiscovery(
  childProfile: AssessmentChildProfile,
  answers: AssessmentAnswer[]
): Promise<AnalysisResult> {
  const domainScores = computeDomainScores(answers);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return generateFallbackAnalysis(childProfile, domainScores);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "valiyo-nextjs" } },
    });

    const prompt = buildDiscoveryPrompt(childProfile, domainScores);

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { responseMimeType: "application/json", temperature: 0.7 },
    });

    const responseText = response.text;
    if (!responseText) throw new Error("Gemini API returned empty text");

    const parsed = JSON.parse(responseText) as Partial<AnalysisResult>;

    const radarData = Object.entries(domainScores).map(([domain, score]) => ({
      subject: DOMAIN_LABEL_ID[domain as keyof typeof DOMAIN_LABEL_ID] || domain,
      score: Math.round(score),
      fullMark: 100,
    }));

    const merged: AnalysisResult = {
      childProfileSnapshot: childProfile,
      domainScores,
      radarData,
      ...parsed,
    } as AnalysisResult;

    if (!merged.roadmap) {
      merged.roadmap = generatePersonalizedRoadmap(merged);
    }

    return merged;
  } catch (error) {
    console.error("Gemini analysis failed, using fallback:", error);
    return generateFallbackAnalysis(childProfile, domainScores);
  }
}
