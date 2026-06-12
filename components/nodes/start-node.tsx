import { Handle, Position, type NodeProps } from '@xyflow/react';
import { COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function StartNode({ data }: NodeProps) {
  return (
    <BaseNode className="flex h-12 w-12 items-center justify-center rounded-full border-1 text-xs font-medium" style={{ backgroundColor: COLORS[data.background as string] }}>
      {data.label as string}
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  )
}
