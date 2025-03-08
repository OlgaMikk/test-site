import * as React from "react";

import { IMaskInput } from "react-imask";

import { cn } from "@/utils/cn";

export interface PhoneInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ className, value, onChange }, ref) => {
        return (
            <IMaskInput
                type="tel"
                mask={"+{7} (000) 000-00-00"}
                value={String(value)}
                inputRef={ref}
                onChange={onChange}
                placeholder="Телефон*"
                className={cn(
                    "flex h-8 w-full rounded-none border-b border-gray-dark bg-background py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:h-10",
                    className,
                )}
            />
        );
    },
);
PhoneInput.displayName = "Input";

export { PhoneInput };
