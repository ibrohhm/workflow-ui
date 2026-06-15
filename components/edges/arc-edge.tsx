'use client';
import { BaseEdge, EdgeLabelRenderer, type EdgeProps } from '@xyflow/react';

function getArcPath(
  sx: number, sy: number,
  tx: number, ty: number,
  offset: number,
): [path: string, labelX: number, labelY: number] {
  const dx = tx - sx;
  const dy = ty - sy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  // Perpendicular unit vector (rotate direction 90° CW → curves up for left→right edges)
  const px = dy / len;
  const py = -dx / len;
  // Two control points anchored at source/target levels, offset perpendicular
  const cp1x = sx + px * offset;
  const cp1y = sy + py * offset;
  const cp2x = tx + px * offset;
  const cp2y = ty + py * offset;
  // Cubic bezier midpoint at t=0.5
  const lx = 0.125 * sx + 0.375 * cp1x + 0.375 * cp2x + 0.125 * tx;
  const ly = 0.125 * sy + 0.375 * cp1y + 0.375 * cp2y + 0.125 * ty;
  return [
    `M ${sx} ${sy} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${tx} ${ty}`,
    lx, ly,
  ];
}

export function BidirEdge({
  id,
  sourceX, sourceY,
  targetX, targetY,
  markerEnd,
  markerStart,
  label,
  style,
}: EdgeProps) {
  const [path, lx, ly] = getArcPath(sourceX, sourceY, targetX, targetY, 80);

  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} markerStart={markerStart} style={style} />
      {label && (
        <EdgeLabelRenderer>
          <span
            className="nodrag nopan"
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${lx}px,${ly}px)`,
              fontSize: 10,
              padding: '2px 6px',
              borderRadius: 4,
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--muted-foreground)',
              whiteSpace: 'nowrap',
              pointerEvents: 'all',
            }}
          >
            {label as string}
          </span>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
