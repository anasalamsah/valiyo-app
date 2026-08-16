export function LearnIllustration() {
  return (
    <svg
      viewBox="0 0 220 160"
      className="h-auto w-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="220" height="160" rx="24" fill="#efe9ff" />

      {/* Mission tiles */}
      <rect x="24" y="28" width="64" height="64" rx="16" fill="#5b3df5" />
      <path
        d="M48 60l8 8 16-16"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <rect x="98" y="28" width="64" height="64" rx="16" fill="#ffffff" />
      <circle cx="130" cy="60" r="14" fill="#ffd447" />

      <rect x="24" y="102" width="64" height="34" rx="14" fill="#63d5c7" />
      <rect x="98" y="102" width="98" height="34" rx="14" fill="#ffffff" />
      <rect x="112" y="114" width="70" height="10" rx="5" fill="#63d5c7" opacity="0.5" />

      {/* Floating star */}
      <path
        d="M188 22l3.2 6.9 7.6.9-5.6 5.3 1.5 7.5-6.7-3.7-6.7 3.7 1.5-7.5-5.6-5.3 7.6-.9L188 22Z"
        fill="#ffd447"
      />
    </svg>
  );
}
