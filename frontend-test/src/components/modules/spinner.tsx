import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export type SpinnerProps = React.SVGAttributes<SVGElement>;

export function Spinner({ className, ...rest }: SpinnerProps) {
    return (
        <Loader2
            className={cn(
                'size-[1.5em] shrink-0 animate-spin text-inherit',
                className
            )}
            {...rest}
        />
    );
}
