import { Handle, Position, type NodeProps } from '@xyflow/react';

export function EndNode({ data }: NodeProps) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-gray-800 bg-white text-xs font-medium text-gray-700">
      <Handle type="target" position={Position.Top} />
      {data.label as string}
    </div>
  )
}
