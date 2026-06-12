import { Handle, Position, type NodeProps } from '@xyflow/react';
import { BaseNode } from './base-node';

export function TaskNode({ data }: NodeProps) {
  return (
    <BaseNode className="min-w-[150px] px-4 py-2.5 text-center text-sm">
      <Handle type="target" position={Position.Top} />
      {data.label as string}
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  )
}
