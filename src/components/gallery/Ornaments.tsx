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
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
      className={`pointer-events-none absolute h-7 w-7 text-gold-bright/85 transition-opacity duration-500 ${transforms[position]}`}
    >
      <path d="M2 24V8C2 4.7 4.7 2 8 2H24" strokeLinecap="round" />
      <path d="M6 15V9.5C6 7.5 7.5 6 9.5 6H15" strokeLinecap="round" opacity="0.7" />
      <circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none" />
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