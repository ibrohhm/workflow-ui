import { Handle, Position, type NodeProps } from '@xyflow/react';
import { COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function TaskNode({ data, selected }: NodeProps) {
  return (
    <BaseNode selected={selected} className="min-w-[150px] px-4 py-2.5 text-center text-sm" style={{ backgroundColor: COLORS[data.background as string] }}>
      <Handle type="target" position={Position.Top} />
      {data.label as string}
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  )
}
