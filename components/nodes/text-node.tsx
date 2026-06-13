import { NodeResizer, type NodeProps } from '@xyflow/react';
import { TEXT_COLORS } from '@/constants/colors';

export function TextNode({ data, selected }: NodeProps) {
  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={60}
        minHeight={24}
        maxWidth={500}
        color="var(--ring)"
        handleStyle={{ width: 7, height: 7, borderRadius: 2 }}
      />
      <div className="p-1">
        <div
          className="leading-snug break-words overflow-hidden"
          style={{
            width: '100%',
            height: '100%',
            maxWidth: 500,
            color: TEXT_COLORS[data.color as string] ?? 'var(--foreground)',
            fontSize: (data.fontSize as string) ?? '0.875rem',
            whiteSpace: 'pre-wrap',
          }}
        >
          {data.label as string}
        </div>
      </div>
    </>
  )
}
