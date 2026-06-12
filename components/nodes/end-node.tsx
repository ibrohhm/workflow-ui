import { Handle, Position, type NodeProps } from '@xyflow/react';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function EndNode({ data, selected }: NodeProps) {
  return (
    <BaseNode
      selected={selected}
      keepAspectRatio
      className="w-full h-full flex items-center justify-center rounded-full border-2 text-xs font-semibold"
      style={{
        backgroundColor: COLORS[data.background as string],
        color: TEXT_COLORS[data.textColor as string],
        minWidth: '3rem',
        minHeight: '3rem',
      }}
    >
      <Handle type="target" position={Position.Top} />
      {data.label as string}
    </BaseNode>
  )
}
