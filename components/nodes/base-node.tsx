import { cn } from '@/lib/utils';

interface BaseNodeProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function BaseNode({ className, style, children }: Readonly<BaseNodeProps>) {
  return (
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
  )
}
