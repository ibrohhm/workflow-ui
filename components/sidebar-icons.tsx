// SVG icons for the properties sidebar edge controls.
// Sized to sit inside 32×32 OptionButton cells.

export function BezierIcon() {
  return (
    <svg width="26" height="14" viewBox="0 0 26 14" fill="none" aria-hidden>
      <path d="M2 12 C8 4 18 4 24 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function StraightIcon() {
  return (
    <svg width="26" height="14" viewBox="0 0 26 14" fill="none" aria-hidden>
      <line x1="2" y1="7" x2="24" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function StepIcon() {
  return (
    <svg width="26" height="14" viewBox="0 0 26 14" fill="none" aria-hidden>
      <polyline
        points="2,12 13,12 13,2 24,2"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export function SmoothIcon() {
  return (
    <svg width="26" height="14" viewBox="0 0 26 14" fill="none" aria-hidden>
      <path d="M2 12 Q13 12 13 7 Q13 2 24 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SolidIcon() {
  return (
    <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
      <line x1="2" y1="4" x2="24" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DashedIcon() {
  return (
    <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
      <line x1="2" y1="4" x2="24" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 3" />
    </svg>
  );
}

export function DottedIcon() {
  return (
    <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
      <line x1="2" y1="4" x2="24" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.1 4.5" />
    </svg>
  );
}

export function ArrowNoneIcon() {
  return (
    <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
      <line x1="2" y1="4" x2="24" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowOpenIcon() {
  return (
    <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
      <line x1="2" y1="4" x2="20" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="16,1 22,4 16,7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowFilledIcon() {
  return (
    <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
      <line x1="2" y1="4" x2="18" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="16,0.5 24,4 16,7.5" fill="currentColor" />
    </svg>
  );
}

export function ArrowBothIcon() {
  return (
    <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
      <line x1="8" y1="4" x2="18" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="10,0.5 2,4 10,7.5" fill="currentColor" />
      <polygon points="16,0.5 24,4 16,7.5" fill="currentColor" />
    </svg>
  );
}
