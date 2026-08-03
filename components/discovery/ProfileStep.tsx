"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { ageFromBirthDate } from "@/lib/utils/age";
import type { AssessmentChildProfile, ChildGenderLabel } from "@/types/discoveryAssessment";
import type { ChildGender } from "@/types/child";

const GENDER_MAP: Record<ChildGender, ChildGenderLabel> = {
  male: "Laki-laki",
  female: "Perempuan",
  unspecified: "Tidak ingin menyebutkan",
};

type FormValues = {
  age: number;
  gender: ChildGenderLabel;
  school: string;
  className: string;
  favoriteActivities: string;
};

export function ProfileStep({
  childId,
  initialProfile,
  onBack,
  onContinue,
}: {
  childId: string;
  initialProfile: Partial<AssessmentChildProfile>;
  onBack: () => void;
  onContinue: (profile: AssessmentChildProfile) => void;
}) {
  const { childProfiles } = useAuth();
  const child = childProfiles.find((c) => c.id === childId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      age: initialProfile.age ?? ageFromBirthDate(child?.birthDate ?? null) ?? 0,
      gender: initialProfile.gender ?? (child ? GENDER_MAP[child.gender] : "Tidak ingin menyebutkan"),
      school: initialProfile.school ?? "",
      className: initialProfile.className ?? "",
      favoriteActivities: initialProfile.favoriteActivities ?? "",
    },
  });

  // Re-sync defaults if the resumed draft profile arrives after first render.
  useEffect(() => {
    reset({
      age: initialProfile.age ?? ageFromBirthDate(child?.birthDate ?? null) ?? 0,
      gender: initialProfile.gender ?? (child ? GENDER_MAP[child.gender] : "Tidak ingin menyebutkan"),
      school: initialProfile.school ?? "",
      className: initialProfile.className ?? "",
      favoriteActivities: initialProfile.favoriteActivities ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProfile.school, initialProfile.className, initialProfile.favoriteActivities]);

  function onSubmit(values: FormValues) {
    onContinue({
      name: child?.name ?? "Anak",
      age: Number(values.age),
      gender: values.gender,
      school: values.school,
      className: values.className,
      favoriteActivities: values.favoriteActivities,
    });
  }

  return (
    <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">Langkah 2 dari 4</p>
      <h2 className="mt-1 font-display text-xl font-semibold text-text">
        Sedikit info tentang {child?.name ?? "anak"}
      </h2>
      <p className="mt-1 text-sm text-text-muted">
        Ini membantu AI memberi rekomendasi yang lebih pas.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="age" className="text-xs font-semibold text-text">
              Usia (tahun)
            </label>
            <input
              id="age"
              type="number"
              min={1}
              max={18}
              className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
              {...register("age", { required: true, valueAsNumber: true, min: 1, max: 18 })}
            />
            {errors.age && <p className="mt-1 text-xs text-red-500">Usia 1-18 tahun</p>}
          </div>

          <div>
            <label htmlFor="gender" className="text-xs font-semibold text-text">
              Jenis kelamin
            </label>
            <select
              id="gender"
              className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
              {...register("gender")}
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
              <option value="Tidak ingin menyebutkan">Tidak ingin menyebutkan</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="school" className="text-xs font-semibold text-text">
            Sekolah
          </label>
          <input
            id="school"
            type="text"
            placeholder="mis. TK Bintang Kecil"
            className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
            {...register("school", { required: "Wajib diisi" })}
          />
          {errors.school && <p className="mt-1 text-xs text-red-500">{errors.school.message}</p>}
        </div>

        <div>
          <label htmlFor="className" className="text-xs font-semibold text-text">
            Kelas
          </label>
          <input
            id="className"
            type="text"
            placeholder="mis. Kelas B1"
            className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
            {...register("className", { required: "Wajib diisi" })}
          />
          {errors.className && (
            <p className="mt-1 text-xs text-red-500">{errors.className.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="favoriteActivities" className="text-xs font-semibold text-text">
            Aktivitas favorit
          </label>
          <textarea
            id="favoriteActivities"
            rows={2}
            placeholder="mis. Bermain lego, eksperimen air, menyusun puzzle"
            className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
            {...register("favoriteActivities", { required: "Wajib diisi" })}
          />
          {errors.favoriteActivities && (
            <p className="mt-1 text-xs text-red-500">{errors.favoriteActivities.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Kembali
          </Button>
          <Button type="submit" className="flex-1">
            Lanjutkan
          </Button>
        </div>
      </form>
    </div>
  );
}
