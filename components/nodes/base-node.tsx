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
        color="var(--border)"
        handleStyle={{ width: 10, height: 10, borderRadius: 2 }}
      />
      <div className="w-full h-full p-1">
        <div
          className={cn(
            'w-full h-full border border-border bg-card rounded-sm',
            'shadow-xs transition-shadow duration-150 ease-out',
            'hover:shadow-sm',
            className,
          )}
          style={style}
        >
          {children}
        </div>
      </div>
    </>
  )
}
