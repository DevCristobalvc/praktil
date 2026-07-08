const MARK = (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
    <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export function CornerMarks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-6 text-foreground/25 sm:inset-10"
    >
      <span className="absolute top-0 left-0">{MARK}</span>
      <span className="absolute top-0 right-0">{MARK}</span>
      <span className="absolute bottom-0 left-0">{MARK}</span>
      <span className="absolute right-0 bottom-0">{MARK}</span>
      <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[0.55rem] tracking-[0.4em] uppercase">
        PRK · LAB
      </span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[0.55rem] tracking-[0.4em] uppercase">
        3.4516° N · 76.5320° W
      </span>
    </div>
  );
}
