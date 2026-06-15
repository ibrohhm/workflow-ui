export const CONTAINER_COLORS: Record<string, { bg: string; border: string; label: string }> = {
  'default': { bg: 'oklch(0.91 0 0 / 0.35)',      border: 'oklch(0.75 0 0 / 0.55)',       label: 'oklch(0.50 0 0)'     },
  'purple':  { bg: 'oklch(0.9 0.06 300 / 0.35)',  border: 'oklch(0.78 0.12 310 / 0.55)',  label: 'oklch(0.5 0.18 300)' },
  'blue':    { bg: 'oklch(0.9 0.06 240 / 0.35)',  border: 'oklch(0.78 0.12 240 / 0.55)',  label: 'oklch(0.5 0.18 240)' },
  'teal':    { bg: 'oklch(0.9 0.06 200 / 0.35)',  border: 'oklch(0.78 0.12 200 / 0.55)',  label: 'oklch(0.5 0.18 200)' },
  'green':   { bg: 'oklch(0.9 0.06 150 / 0.35)',  border: 'oklch(0.78 0.12 150 / 0.55)',  label: 'oklch(0.5 0.18 150)' },
  'yellow':  { bg: 'oklch(0.9 0.06 90  / 0.35)',  border: 'oklch(0.78 0.12 90  / 0.55)',  label: 'oklch(0.5 0.18 90)'  },
  'orange':  { bg: 'oklch(0.9 0.06 60  / 0.35)',  border: 'oklch(0.78 0.12 60  / 0.55)',  label: 'oklch(0.5 0.18 60)'  },
  'rose':    { bg: 'oklch(0.9 0.06 10  / 0.35)',  border: 'oklch(0.78 0.12 10  / 0.55)',  label: 'oklch(0.5 0.18 10)'  },
  'black':   { bg: 'oklch(0.40 0 0 / 0.35)',       border: 'oklch(0.45 0 0 / 0.55)',       label: 'oklch(0.75 0 0)'     },
};

export const TEXT_COLORS: Record<string, string> = {
  'rose':    'oklch(0.47 0.20 10)',
  'orange':  'oklch(0.52 0.14 60)',
  'yellow':  'oklch(0.49 0.13 90)',
  'green':   'oklch(0.45 0.10 150)',
  'teal':    'oklch(0.44 0.09 200)',
  'blue':    'oklch(0.44 0.13 240)',
  'purple':  'oklch(0.44 0.13 300)',
  'black':   'oklch(0.28 0 0)',
};

export const BACKGROUND_COLORS: Record<string, string> = {
  'rose':    'oklch(0.84 0.12 10)',
  'orange':  'oklch(0.93 0.06 60)',
  'yellow':  'oklch(0.97 0.07 90)',
  'green':   'oklch(0.93 0.07 150)',
  'teal':    'oklch(0.90 0.05 200)',
  'blue':    'oklch(0.90 0.06 240)',
  'purple':  'oklch(0.91 0.06 300)',
  'black':   'oklch(0.45 0 0)',
};
