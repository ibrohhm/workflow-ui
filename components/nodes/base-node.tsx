import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BaseNodeProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function BaseNode({ className, style, children }: Readonly<BaseNodeProps>) {
  return (
    <Card className={cn('rounded-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', className)} style={style}>
      {children}
    </Card>
  )
}
