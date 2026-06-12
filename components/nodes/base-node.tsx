import { Handle, NodeResizer, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';

interface BaseNodeProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  selected?: boolean;
  keepAspectRatio?: boolean;
  handles?: boolean;
}

export function BaseNode({ className, style, children, selected, keepAspectRatio, handles = true }: Readonly<BaseNodeProps>) {
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
          {handles && (
            <>
              <Handle type="target" position={Position.Top}    id="top-target"    />
              <Handle type="source" position={Position.Top}    id="top-source"    />
              <Handle type="target" position={Position.Bottom} id="bottom-target" />
              <Handle type="source" position={Position.Bottom} id="bottom-source" />
              <Handle type="target" position={Position.Left}   id="left-target"   />
              <Handle type="source" position={Position.Left}   id="left-source"   />
              <Handle type="target" position={Position.Right}  id="right-target"  />
              <Handle type="source" position={Position.Right}  id="right-source"  />
            </>
          )}
          {children}
        </div>
      </div>
    </>
  )
}
