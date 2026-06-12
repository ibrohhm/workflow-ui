import { Handle, Position, type NodeProps } from '@xyflow/react';

export function TaskNode({ data }: NodeProps) {
  return (
    <div className="min-w-[150px] rounded-md border border-gray-400 bg-white px-4 py-2.5 text-center text-sm text-gray-800 shadow-sm">
      <Handle type="target" position={Position.Top} />
      {data.label as string}
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
