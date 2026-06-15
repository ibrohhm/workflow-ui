'use client';
import { NodeResizer, type NodeProps } from '@xyflow/react';
import { CONTAINER_COLORS } from '@/constants/colors';

export function ContainerNode({ selected, data }: NodeProps) {
  const color = CONTAINER_COLORS[data?.color as string] ?? CONTAINER_COLORS['default'];

  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={120}
        minHeight={80}
        color={color.border}
        handleStyle={{ width: 10, height: 10, borderRadius: 2 }}
      />
      <div
        className="w-full h-full rounded-xl"
        style={{ background: color.bg, border: `1.5px solid ${color.border}` }}
      >
        {!!data?.label && (
          <span
            className="absolute top-2.5 left-3 text-[10px] font-semibold tracking-wide select-none pointer-events-none"
            style={{ color: color.label }}
          >
            {String(data.label)}
          </span>
        )}
      </div>
    </>
  );
}
