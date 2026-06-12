import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/react';
import { COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function StartNode({ data, selected }: NodeProps) {
  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={40}
        minHeight={40}
        color="var(--ring)"
        handleStyle={{ width: 7, height: 7, borderRadius: 2 }}
      />
      <BaseNode
        className="w-full h-full flex items-center justify-center rounded-full border text-xs font-medium"
        style={{ backgroundColor: COLORS[data.background as string], minWidth: '3rem', minHeight: '3rem' }}
      >
        {data.label as string}
        <Handle type="source" position={Position.Bottom} />
      </BaseNode>
    </>
  )
}
