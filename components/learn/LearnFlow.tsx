"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { ageFromBirthDate } from "@/lib/utils/age";
import { ChildPicker } from "@/components/shared/ChildPicker";
import { AcademyGrid } from "@/components/learn/AcademyGrid";
import { AcademyDetailView } from "@/components/learn/AcademyDetailView";
import type { AcademyData } from "@/types/learnAcademy";

type Step = "child" | "academies" | "detail";

export function LearnFlow() {
  const { selectedChild, childProfiles } = useAuth();
  const [step, setStep] = useState<Step>("child");
  const [selectedChildId, setSelectedChildId] = useState<string | null>(
    selectedChild?.id ?? null
  );
  const [activeAcademy, setActiveAcademy] = useState<AcademyData | null>(null);

  if (!selectedChildId || step === "child") {
    return (
      <ChildPicker
        selectedChildId={selectedChildId}
        onSelect={setSelectedChildId}
        onContinue={() => setStep("academies")}
        stepLabel="Mulai Belajar"
        description="Pilih profil anak yang akan belajar hari ini."
        emptyStateDescription="Tambahkan profil anak dulu di dashboard sebelum memulai Learn."
      />
    );
  }

  if (step === "detail" && activeAcademy) {
    const child = childProfiles.find((c) => c.id === selectedChildId);
    const childAge = ageFromBirthDate(child?.birthDate ?? null) ?? 5;
    return (
      <AcademyDetailView
        academy={activeAcademy}
        childId={selectedChildId}
        childName={child?.name ?? "Anak"}
        childAge={childAge}
        onBack={() => setStep("academies")}
      />
    );
  }

  return (
    <AcademyGrid
      onSelect={(academy) => {
        setActiveAcademy(academy);
        setStep("detail");
      }}
    />
  );
}
