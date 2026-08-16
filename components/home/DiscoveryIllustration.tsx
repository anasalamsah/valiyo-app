export function DiscoveryIllustration() {
  return (
    <svg
      viewBox="0 0 220 160"
      className="h-auto w-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="220" height="160" rx="24" fill="#fff6e6" />

      {/* Radar rings */}
      <circle cx="80" cy="80" r="46" fill="none" stroke="#ffd447" strokeWidth="1.5" opacity="0.5" />
      <circle cx="80" cy="80" r="32" fill="none" stroke="#ffd447" strokeWidth="1.5" opacity="0.7" />
      <circle cx="80" cy="80" r="18" fill="none" stroke="#ffd447" strokeWidth="1.5" />

      {/* Profile polygon */}
      <path
        d="M80 44 L108 66 L98 100 L62 100 L52 66 Z"
        fill="#5b3df5"
        opacity="0.85"
      />
      <circle cx="80" cy="44" r="4" fill="#5b3df5" />
      <circle cx="108" cy="66" r="4" fill="#5b3df5" />
      <circle cx="98" cy="100" r="4" fill="#5b3df5" />
      <circle cx="62" cy="100" r="4" fill="#5b3df5" />
      <circle cx="52" cy="66" r="4" fill="#5b3df5" />

      {/* Insight cards */}
      <rect x="148" y="26" width="56" height="30" rx="10" fill="#ffffff" />
      <rect x="158" y="36" width="30" height="6" rx="3" fill="#63d5c7" />
      <rect x="158" y="46" width="20" height="6" rx="3" fill="#63d5c7" opacity="0.6" />

      <rect x="148" y="64" width="56" height="30" rx="10" fill="#ffffff" />
      <rect x="158" y="74" width="36" height="6" rx="3" fill="#5b3df5" />
      <rect x="158" y="84" width="22" height="6" rx="3" fill="#5b3df5" opacity="0.6" />

      <rect x="148" y="102" width="56" height="30" rx="10" fill="#ffffff" />
      <rect x="158" y="112" width="28" height="6" rx="3" fill="#ffd447" opacity="0.9" />
      <rect x="158" y="122" width="18" height="6" rx="3" fill="#ffd447" opacity="0.6" />
    </svg>
  );
}
