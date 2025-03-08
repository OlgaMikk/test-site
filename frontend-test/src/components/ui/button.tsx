import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-white hover:bg-primary hover:opacity-90",
                outline:
                    "border border-black bg-background hover:bg-black hover:text-white",
                link: "text-primary underline-offset-4 hover:underline",
                ghost: "",
            },
            size: {
                default: "h-[46px] px-4 py-2",
                xs: "h-5 px-2.5",
                sm: "h-9 rounded-lg px-3",
                lg: "h-11 rounded-lg px-8",
                xl: "h-[60px] rounded-lg px-8",
                icon: "size-8 rounded max-[350px]:size-7 xl:size-10 xl:rounded-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
