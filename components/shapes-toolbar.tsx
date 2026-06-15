"use client"

import { T } from './sidebar-components';

const SHAPES = ['circle', 'task', 'diamond', 'text', 'card', 'container'] as const;

function ShapePreview({ type }: { type: string }) {
  const base = 'border select-none';
  const borderColor = 'var(--border)';

  if (type === 'circle') {
    return (
      <div
        className={`${base} rounded-full`}
        style={{ width: 28, height: 28, borderColor }}
      />
    );
  }
  if (type === 'diamond') {
    return (
      <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className={base}
          style={{ width: 18, height: 18, transform: 'rotate(45deg)', borderColor }}
        />
      </div>
    );
  }
  if (type === 'text') {
    return (
      <div
        className="flex items-center justify-center border border-dashed rounded select-none"
        style={{ width: 32, height: 24, fontSize: 10, color: 'var(--border)' }}
      >
        text
      </div>
    );
  }
  if (type === 'card') {
    return (
      <div
        className={`${base} rounded`}
        style={{ width: 32, height: 24, borderColor, borderTopWidth: 3 }}
      />
    );
  }
  if (type === 'container') {
    return (
      <div
        className="rounded-lg border border-dashed select-none"
        style={{
          width: 34, height: 26,
          borderColor: 'oklch(0.78 0.12 310 / 0.7)',
          background: 'oklch(0.9 0.06 300 / 0.35)',
        }}
      />
    );
  }
  // task
  return (
    <div
      className={`${base} rounded`}
      style={{ width: 32, height: 22, borderColor }}
    />
  );
}

export function ShapesToolbar() {
  const onDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData('application/reactflow', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2 py-2 rounded-xl"
      style={{
        backgroundColor: 'var(--background)',
        boxShadow: T.shadow,
      }}
    >
      {SHAPES.map((type) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => onDragStart(e, type)}
          className="flex items-center justify-center w-9 h-9 rounded-sm cursor-grab active:cursor-grabbing transition-colors duration-100"
          style={{ userSelect: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.hover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <ShapePreview type={type} />
        </div>
      ))}
    </div>
  );
}
