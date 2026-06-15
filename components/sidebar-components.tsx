"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const T = {
  bg:         'oklch(0.99 0.003 265)',
  border:     'oklch(0.88 0.012 265)',
  sep:        'oklch(0.93 0.006 265)',
  text:       'oklch(0.16 0.01 265)',
  muted:      'oklch(0.50 0.025 265)',
  accent:     'oklch(0.52 0.21 265)',
  accentBg:   'oklch(0.95 0.045 265)',
  accentText: 'oklch(0.38 0.18 265)',
  hover:      'oklch(0.95 0.018 265)',
  surface:    'oklch(0.97 0 265)',
  shadow:     '0 8px 32px oklch(0.15 0.02 265 / 0.1), 0 2px 8px oklch(0.15 0.02 265 / 0.07), 0 0 0 1px oklch(0.88 0.012 265)',
} as const;

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold mb-2 select-none tracking-wide" style={{ color: T.muted }}>
      {children}
    </p>
  );
}

export function Sep() {
  return <div style={{ height: 1, backgroundColor: T.sep, margin: '0 12px' }} />;
}

export function SwatchSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-3 pt-3 pb-3">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export function OptionSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-3 pt-3 pb-3">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex gap-1.5">{children}</div>
    </div>
  );
}

export function Swatch({
  color,
  label,
  isSelected,
  onClick,
}: {
  color?: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          aria-label={label}
          aria-pressed={isSelected}
          style={{
            backgroundColor: color ?? T.hover,
            borderRadius: 7,
            width: 30,
            height: 30,
            flexShrink: 0,
            position: 'relative',
            border: `1px solid ${color ? 'transparent' : T.border}`,
            outline: isSelected ? `2px solid ${T.accent}` : 'none',
            outlineOffset: 2,
            transition: 'outline 100ms, opacity 100ms',
          }}
          className="focus:outline-none hover:opacity-80 transition-opacity duration-100"
        >
          {!color && (
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              viewBox="0 0 30 30" fill="none"
            >
              <line x1="7" y1="7" x2="23" y2="23" stroke={T.border} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={4}>{label}</TooltipContent>
    </Tooltip>
  );
}

export function OptionButton({
  icon,
  label,
  isSelected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          aria-label={label}
          aria-pressed={isSelected}
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            border: `1px solid ${isSelected ? T.accent : T.border}`,
            backgroundColor: isSelected ? T.accentBg : T.bg,
            color: isSelected ? T.accentText : T.muted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 120ms',
            cursor: 'pointer',
          }}
          className="focus:outline-none hover:opacity-80"
        >
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={4}>{label}</TooltipContent>
    </Tooltip>
  );
}
