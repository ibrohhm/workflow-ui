import { type NodeProps } from '@xyflow/react';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function CardNode({ data, selected }: NodeProps) {
  return (
    <BaseNode
      selected={selected}
      className="w-full h-full flex flex-col overflow-hidden p-0"
      style={{ color: TEXT_COLORS[data.textColor as string] }}
    >
      <div
        className="shrink-0 px-3 py-1 border-b border-border/60"
        style={{ backgroundColor: COLORS[data.background as string] ?? 'var(--muted)' }}
      >
        <span className="text-xs font-semibold leading-none tracking-tight">
          {data.title as string}
        </span>
      </div>

      <div className="flex-1 px-3 py-2 overflow-auto">
        <p className="text-xs text-card-foreground leading-snug">
          {data.content as string}
        </p>
      </div>
    </BaseNode>
  )
}
