import { Handle, Position, type NodeProps } from '@xyflow/react';
import { COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function EndNode({ data, selected }: NodeProps) {
  return (
    <BaseNode selected={selected} className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-xs font-semibold" style={{ backgroundColor: COLORS[data.background as string] }}>
      <Handle type="target" position={Position.Top} />
      {data.label as string}
    </BaseNode>
  )
}
