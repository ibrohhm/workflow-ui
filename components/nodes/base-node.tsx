import { NodeResizer } from '@xyflow/react';
import { cn } from '@/lib/utils';

interface BaseNodeProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  selected?: boolean;
  keepAspectRatio?: boolean;
}

export function BaseNode({ className, style, children, selected, keepAspectRatio }: Readonly<BaseNodeProps>) {
  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={40}
        minHeight={32}
        maxWidth={400}
        maxHeight={400}
        keepAspectRatio={keepAspectRatio}
        color="var(--ring)"
        handleStyle={{ width: 7, height: 7, borderRadius: 2 }}
      />
      <div
        className={cn(
          'border border-border bg-card rounded-sm',
          'shadow-xs transition-shadow duration-150 ease-out',
          'hover:shadow-sm',
          className,
        )}
        style={style}
      >
        {children}
      </div>
    </>
  )
}
