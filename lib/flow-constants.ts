export const NodeType = {
  START: 'start',
  END: 'end',
  TASK: 'task',
  GATEWAY: 'gateway',
} as const

export const EdgeType = {
  DEFAULT: 'default',
  STRAIGHT: 'straight',
  STEP: 'step',
  SMOOTH_STEP: 'smoothstep',
  SIMPLE_BEZIER: 'simplebezier',
} as const
