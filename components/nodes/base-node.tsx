import { cn } from '@/lib/utils';

interface BaseNodeProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  selected?: boolean;
}

export function BaseNode({ className, style, children, selected }: Readonly<BaseNodeProps>) {
  return (
    <div
      className={cn(
        'border border-border bg-card rounded-sm',
        'shadow-xs transition-shadow duration-150 ease-out',
        'hover:shadow-sm',
        className,
        selected && 'ring-2 ring-ring shadow-sm',
      )}
      style={style}
    >
      {children}
    </div>
  )
}
