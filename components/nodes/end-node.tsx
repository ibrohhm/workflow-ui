import { Handle, Position, type NodeProps } from '@xyflow/react';
import { BaseNode } from './base-node';

export function EndNode({ data }: NodeProps) {
  return (
    <BaseNode className="flex h-12 w-12 items-center justify-center rounded-full border-1 text-xs font-medium">
      <Handle type="target" position={Position.Top} />
      {data.label as string}
    </BaseNode>
  )
}
