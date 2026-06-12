import { Handle, Position, type NodeProps } from '@xyflow/react';
import { COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function GatewayNode({ data, selected }: NodeProps) {
  return (
    <BaseNode
      selected={selected}
      keepAspectRatio
      className="w-full h-full relative rotate-45 flex items-center justify-center text-xs font-medium overflow-visible"
      style={{ backgroundColor: COLORS[data.background as string], minWidth: '4rem', minHeight: '4rem' }}
    >
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
