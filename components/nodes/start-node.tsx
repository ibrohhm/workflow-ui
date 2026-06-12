import { Handle, Position, type NodeProps } from '@xyflow/react';

export function StartNode({ data }: NodeProps) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-600 bg-white text-xs font-medium text-gray-700">
      {data.label as string}
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
