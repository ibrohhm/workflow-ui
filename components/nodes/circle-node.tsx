import { type NodeProps } from '@xyflow/react';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function CircleNode({ data, selected }: NodeProps) {
  return (
    <BaseNode
      selected={selected}
      keepAspectRatio
      className="w-full h-full flex items-center justify-center rounded-full border text-xs font-medium"
      style={{
        backgroundColor: COLORS[data.background as string],
        color: TEXT_COLORS[data.textColor as string],
        minWidth: '5rem',
        minHeight: '5rem',
      }}
    >
      {data.label as string}
    </BaseNode>
  )
}
