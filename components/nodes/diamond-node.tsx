import { Handle, Position, type NodeProps } from '@xyflow/react';
import { BACKGROUND_COLORS, TEXT_COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function DiamondNode({ data, selected }: NodeProps) {
  return (
    <BaseNode
      selected={selected}
      keepAspectRatio
      handles={false}
      className="w-full h-full relative rotate-45 flex items-center justify-center text-xs font-medium overflow-visible"
      style={{
        backgroundColor: BACKGROUND_COLORS[data.background as string],
        color: TEXT_COLORS[data.textColor as string],
        fontSize: (data.fontSize as string) ?? undefined,
        minWidth: '5rem',
        minHeight: '5rem',
      }}
    >
      <span className="absolute text-xs -rotate-45 font-medium text-center px-2">
        <span style={{ whiteSpace: 'pre-wrap' }}>{data.label as string}</span>
      </span>
      <Handle type="target" position={Position.Top}     id="top-target"     style={{ top: 0,      left: 0,                           transform: 'translate(-50%, -50%)' }} />
      <Handle type="source" position={Position.Top}     id="top-source"     style={{ top: 0,      left: 0,                           transform: 'translate(-50%, -50%)' }} />
      <Handle type="target" position={Position.Left}    id="left-target"    style={{ top: 'auto', left: 0,                bottom: 0, transform: 'translate(-50%, 50%)' }} />
      <Handle type="source" position={Position.Left}    id="left-source"    style={{ top: 'auto', left: 0,                bottom: 0, transform: 'translate(-50%, 50%)' }} />
      <Handle type="target" position={Position.Right}   id="right-target"   style={{ top: 0,                    right: 0,            transform: 'translate(50%, -50%)' }} />
      <Handle type="source" position={Position.Right}   id="right-source"   style={{ top: 0,                    right: 0,            transform: 'translate(50%, -50%)' }} />
      <Handle type="target" position={Position.Bottom}  id="bottom-target"  style={{              left: 'auto', right: 0, bottom: 0, transform: 'translate(50%,  50%)' }} />
      <Handle type="source" position={Position.Bottom}  id="bottom-source"  style={{              left: 'auto', right: 0, bottom: 0, transform: 'translate(50%,  50%)' }} />
    </BaseNode>
  )
}
