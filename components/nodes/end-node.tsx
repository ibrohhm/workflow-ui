import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/react';
import { COLORS } from '@/constants/colors';
import { BaseNode } from './base-node';

export function EndNode({ data, selected }: NodeProps) {
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
        className="w-full h-full flex items-center justify-center rounded-full border-2 text-xs font-semibold"
        style={{ backgroundColor: COLORS[data.background as string], minWidth: '3rem', minHeight: '3rem' }}
      >
        <Handle type="target" position={Position.Top} />
        {data.label as string}
      </BaseNode>
    </>
  )
}
