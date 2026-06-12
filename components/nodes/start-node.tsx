import { Handle, Position, type NodeProps } from '@xyflow/react';
import { COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function StartNode({ data, selected }: NodeProps) {
  return (
    <BaseNode
      selected={selected}
      keepAspectRatio
      className="w-full h-full flex items-center justify-center rounded-full border text-xs font-medium"
      style={{ backgroundColor: COLORS[data.background as string], minWidth: '3rem', minHeight: '3rem' }}
    >
      {data.label as string}
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  )
}
