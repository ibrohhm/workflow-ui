import { Handle, Position, type NodeProps } from '@xyflow/react';
import { BaseNode } from './base-node';

export function StartNode({ data }: NodeProps) {
  return (
    <BaseNode className="flex h-12 w-12 items-center justify-center rounded-full border-1 text-xs font-medium">
      {data.label as string}
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  )
}
