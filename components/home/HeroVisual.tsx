export function HeroVisual() {
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
      <div
        className="absolute right-10 top-6 h-6 w-6 rounded-full bg-accent"
        aria-hidden="true"
      />
      <svg
        className="absolute right-6 top-16 h-28 w-16 text-secondary"
        viewBox="0 0 60 120"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M30 0C46 0 58 14 56 32C54 50 38 54 34 72C31 86 36 100 22 100C8 100 0 82 2 62C4 44 -2 26 10 12C16 4 22 0 30 0Z"
          fill="currentColor"
        />
      </svg>

      {/* Simple original "child with tablet" illustration built from basic shapes */}
      <svg
        className="absolute inset-x-0 bottom-0 mx-auto h-56 w-56"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <ellipse cx="100" cy="190" rx="60" ry="8" fill="#00000010" />
        <rect x="55" y="90" width="90" height="90" rx="30" fill="#7c5cff" />
        <circle cx="100" cy="60" r="34" fill="#ffd9b8" />
        <path
          d="M66 55C66 34 82 20 100 20C118 20 134 34 134 55"
          fill="#2d2440"
        />
        <rect x="72" y="112" width="56" height="40" rx="8" fill="#ffffff" />
        <rect x="80" y="120" width="40" height="24" rx="4" fill="#63d5c7" />
      </svg>

      {/* Floating chip: Discovery */}
      <div className="absolute left-2 top-14 flex items-center gap-2 rounded-2xl bg-surface px-3 py-2 shadow-md shadow-black/5">
        <span className="text-base">🧠</span>
        <div className="text-left">
          <p className="text-[10px] font-semibold text-text">Discovery</p>
          <p className="text-[9px] text-text-muted">Insights &amp; scores</p>
        </div>
      </div>

      {/* Floating chip: Learning style donut */}
      <div className="absolute -left-4 bottom-10 flex items-center gap-2 rounded-2xl bg-surface px-3 py-2 shadow-md shadow-black/5">
        <div
          className="h-6 w-6 rounded-full"
          style={{
            background:
              "conic-gradient(#5b3df5 0% 40%, #63d5c7 40% 70%, #ffd447 70% 100%)",
          }}
        />
        <p className="text-[10px] font-semibold text-text">Learning Style</p>
      </div>

      {/* Floating chip: Strengths */}
      <div className="absolute -right-2 bottom-24 rounded-2xl bg-surface px-3 py-2 shadow-md shadow-black/5">
        <p className="text-[10px] font-semibold text-text">Strengths</p>
        <p className="text-[9px] text-text-muted">Logic · Creativity</p>
      </div>

      {/* Floating chip: Today's journey */}
      <div className="absolute -right-4 bottom-2 flex items-center gap-2 rounded-2xl bg-surface px-3 py-2 shadow-md shadow-black/5">
        <span className="text-base">🌱</span>
        <p className="text-[10px] font-semibold text-text">Today&rsquo;s Journey</p>
      </div>
    </div>
  );
}
