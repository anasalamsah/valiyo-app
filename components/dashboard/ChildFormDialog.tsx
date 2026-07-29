"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import type { Child, ChildGender, ChildInput } from "@/types/child";

const AVATAR_OPTIONS = ["🧒", "👦", "👧", "🧑", "👶"];
const GENDER_OPTIONS: { value: ChildGender; label: string }[] = [
  { value: "unspecified", label: "Prefer not to say" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

type ChildFormValues = {
  name: string;
  birthDate: string;
  gender: ChildGender;
  avatarEmoji: string;
};

type ChildFormDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: ChildInput) => Promise<void>;
  /** When provided, the dialog edits this child instead of creating one. */
  child?: Child | null;
};

export function ChildFormDialog({ open, onClose, onSubmit, child }: ChildFormDialogProps) {
  const isEditing = Boolean(child);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChildFormValues>({
    defaultValues: {
      name: "",
      birthDate: "",
      gender: "unspecified",
      avatarEmoji: AVATAR_OPTIONS[0],
    },
  });

  useEffect(() => {
    if (!open) return;
    reset({
      name: child?.name ?? "",
      birthDate: child?.birthDate ?? "",
      gender: child?.gender ?? "unspecified",
      avatarEmoji: child?.avatarEmoji ?? AVATAR_OPTIONS[0],
    });
  }, [open, child, reset]);

  async function handleFormSubmit(values: ChildFormValues) {
    await onSubmit({
      name: values.name,
      birthDate: values.birthDate ? values.birthDate : null,
      gender: values.gender,
      avatarEmoji: values.avatarEmoji,
    });
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit child" : "Add a child"}
      description="This helps us personalize Discovery and Learn for them."
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label htmlFor="child-name" className="text-xs font-semibold text-text">
            Name
          </label>
          <input
            id="child-name"
            type="text"
            className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
            placeholder="e.g. Aisha"
            {...register("name", { required: "Name is required", maxLength: 60 })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="child-birthdate" className="text-xs font-semibold text-text">
            Birth date (optional)
          </label>
          <input
            id="child-birthdate"
            type="date"
            className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
            {...register("birthDate")}
          />
        </div>

        <div>
          <label htmlFor="child-gender" className="text-xs font-semibold text-text">
            Gender
          </label>
          <select
            id="child-gender"
            className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
            {...register("gender")}
          >
            {GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs font-semibold text-text">Avatar</p>
          <div className="mt-2 flex gap-2">
            {AVATAR_OPTIONS.map((emoji) => (
              <label key={emoji} className="cursor-pointer">
                <input
                  type="radio"
                  value={emoji}
                  className="peer sr-only"
                  {...register("avatarEmoji")}
                />
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-lg peer-checked:border-primary peer-checked:bg-grow-bg">
                  {emoji}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : isEditing ? "Save changes" : "Add child"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
