import { Handle, Position, type NodeProps } from '@xyflow/react';
import { BaseNode } from './base-node';

export function GatewayNode({ data }: NodeProps) {
  return (
    <BaseNode className="relative rotate-45 flex p-8 items-center justify-center text-xs font-medium overflow-visible">
      <span className="absolute text-xs -rotate-45 font-medium text-center px-2">
        {data.label as string}
      </span>
      <Handle type="target" position={Position.Top}
        style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }} />
      <Handle type="source" position={Position.Left} id="no"
        style={{ top: 'auto', left: 0, bottom: 0, transform: 'translate(-50%, 50%)' }} />
      <Handle type="source" position={Position.Right} id="yes"
        style={{ right: 0, top: 0, transform: 'translate(50%, -50%)' }} />
    </BaseNode>
  )
}
