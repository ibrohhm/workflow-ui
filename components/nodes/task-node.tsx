import { type NodeProps } from '@xyflow/react';
import { BACKGROUND_COLORS, TEXT_COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function TaskNode({ data, selected }: NodeProps) {
  return (
    <BaseNode
      selected={selected}
      className="w-full h-full flex items-center justify-center px-4 py-2.5 text-center text-sm"
      style={{
        backgroundColor: BACKGROUND_COLORS[data.background as string],
        color: TEXT_COLORS[data.textColor as string],
        fontSize: (data.fontSize as string) ?? undefined,
        minWidth: '180px',
        minHeight: '50px',
      }}
    >
      <span style={{ whiteSpace: 'pre-wrap' }}>{data.label as string}</span>
    </BaseNode>
  )
}
