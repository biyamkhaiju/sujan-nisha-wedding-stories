export function LotusIcon({ className = "h-5 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 36" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M32 3C28 11 26 19 32 29C38 19 36 11 32 3Z" />
      <path d="M29 29C20 22 17 14 19 8C24 12 27 20 29 29Z" opacity="0.9" />
      <path d="M35 29C44 22 47 14 45 8C40 12 37 20 35 29Z" opacity="0.9" />
      <path d="M26 30C15 28 8 22 6 16C13 17 20 22 26 30Z" opacity="0.72" />
      <path d="M38 30C49 28 56 22 58 16C51 17 44 22 38 30Z" opacity="0.72" />
      <path d="M20 32C26 34 38 34 44 32C39 30.5 25 30.5 20 32Z" opacity="0.65" />
    </svg>
  );
}

export function IntertwinedRings({ className = "h-6 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="13" r="9.5" />
      <circle cx="28" cy="13" r="9.5" />
      <path d="M22 6.8L23.2 4.5L24.4 6.8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function DiamondAccent({ className = "h-2 w-2" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6 0L7.7 4.3L12 6L7.7 7.7L6 12L4.3 7.7L0 6L4.3 4.3L6 0Z" />
    </svg>
  );
}

export function CornerFiligree({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const transforms: Record<typeof position, string> = {
    "top-left": "top-2.5 left-2.5",
    "top-right": "top-2.5 right-2.5 -scale-x-100",
    "bottom-left": "bottom-2.5 left-2.5 -scale-y-100",
    "bottom-right": "bottom-2.5 right-2.5 -scale-x-100 -scale-y-100",
  };

  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      aria-hidden="true"
      className={`pointer-events-none absolute h-8 w-8 text-gold-bright/90 drop-shadow-xs transition-opacity duration-500 ${transforms[position]}`}
    >
      <path d="M2 30V10C2 5.6 5.6 2 10 2H30" strokeLinecap="round" />
      <path d="M6 21C6 12 12 6 21 6" strokeLinecap="round" opacity="0.85" />
      <path d="M9.5 14.5C9.5 11.2 11.2 9.5 14.5 9.5" strokeLinecap="round" opacity="0.75" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HeartSwirlFlourish({ className = "h-7 w-28" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 132 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 26C14 26 24 23 32 16C36 12 40 7 37 4C34.5 1.5 30 3.5 29 7.5C28 3.5 23.5 1.5 21 4C18 7 22 14 29 19C35 23 44 26 56 22C69 17.5 84 14 104 17.5C114 19.2 122 22 130 23" />
    </svg>
  );
}

export function FooterSwirl({ className = "h-3.5 w-14" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 9C6 5 11 5 11 9C11 12 6 12 4 9.5C9 7 22 7 38 8.5C48 9.5 56 9 62 7" />
    </svg>
  );
}

export function OmEmblem({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center font-serif text-2xl leading-none select-none ${className}`}
    >
      ॐ
    </span>
  );
}
