import { Handle, Position, type NodeProps } from '@xyflow/react';

export function GatewayNode({ data }: NodeProps) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <div className="absolute inset-0 rotate-45 border border-gray-600 bg-white" />
      <span className="relative z-10 text-center text-xs font-medium text-gray-700">
        {data.label as string}
      </span>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Left} id="no" />
      <Handle type="source" position={Position.Right} id="yes" />
    </div>
  )
}
