import * as React from "react";

import { cn } from "@/utils/cn";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-8 w-full rounded-none border-b border-gray-dark bg-background py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:h-10",
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = "Input";

export { Input };
