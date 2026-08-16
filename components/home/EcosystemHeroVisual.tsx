const orbitChips = [
  { emoji: "🧒", label: "Kids", position: "left-2 top-6" },
  { emoji: "🎓", label: "Students", position: "right-0 top-16" },
  { emoji: "💡", label: "Skill", position: "left-0 bottom-16" },
  { emoji: "🍎", label: "Teacher", position: "right-2 bottom-24" },
  { emoji: "🤖", label: "AI Future Lab", position: "left-1/2 -translate-x-1/2 bottom-0" },
] as const;

export function EcosystemHeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
      {/* Backdrop card */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#efe9ff] to-[#fff6e6]" />

      {/* Blob accents */}
      <svg
        className="absolute -top-4 left-10 h-40 w-24 text-primary"
        viewBox="0 0 100 160"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M50 0C77 0 96 24 92 52C88 82 60 90 55 118C51 140 60 160 40 160C18 160 6 130 8 100C10 70 0 40 20 16C30 4 40 0 50 0Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="absolute right-6 top-10 h-28 w-16 text-secondary"
        viewBox="0 0 60 120"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M30 0C46 0 58 14 56 32C54 50 38 54 34 72C31 86 36 100 22 100C8 100 0 82 2 62C4 44 -2 26 10 12C16 4 22 0 30 0Z"
          fill="currentColor"
        />
      </svg>

      {/* Central Valiyo mark */}
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28px] bg-primary shadow-lg shadow-primary/20">
        <span className="font-display text-lg font-semibold text-white">
          Valiyo
        </span>
      </div>

      {/* Orbiting product chips */}
      {orbitChips.map((chip) => (
        <div
          key={chip.label}
          className={`absolute ${chip.position} flex items-center gap-2 rounded-2xl bg-surface px-3 py-2 shadow-md shadow-black/5`}
        >
          <span className="text-base" aria-hidden="true">
            {chip.emoji}
          </span>
          <p className="text-[10px] font-semibold text-text">{chip.label}</p>
        </div>
      ))}
    </div>
  );
}
