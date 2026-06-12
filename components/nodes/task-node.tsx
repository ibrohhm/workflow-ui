import { Handle, Position, type NodeProps } from '@xyflow/react';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function TaskNode({ data, selected }: NodeProps) {
  return (
    <BaseNode
      selected={selected}
      className="w-full h-full flex items-center justify-center px-4 py-2.5 text-center text-sm"
      style={{
        backgroundColor: COLORS[data.background as string],
        color: TEXT_COLORS[data.textColor as string],
        minWidth: '150px',
      }}
    >
      <Handle type="target" position={Position.Top} />
      {data.label as string}
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  )
}
