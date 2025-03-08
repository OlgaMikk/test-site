import Image from "next/image";

import { AdvantageType } from "@/types";
import { cn } from "@/utils/cn";

export function Advantage({
    icon,
    title,
    className,
    withGrayBg = false,
    whiteIcons = false,
    variant = "default",
}: AdvantageType & {
    className?: string;
    withGrayBg?: boolean;
    whiteIcons?: boolean;
    variant?: "default" | "small";
}) {
    return (
        <div
            className={cn(
                "flex items-start gap-3 rounded px-3 py-2 lg:p-4 lg:py-3",
                withGrayBg
                    ? "bg-gray-bg text-gray-dark"
                    : "bg-transparent text-white",
                className,
            )}
        >
            <Image
                src={icon.icon}
                height={24}
                width={24}
                alt={title}
                className={cn(
                    variant === "default" && "size-6 lg:mt-px",
                    variant === "small" && "size-5 lg:mt-px",
                    whiteIcons && "brightness-0 grayscale invert",
                )}
            />
            <span
                className={cn(
                    "font-normal",
                    variant === "default" && "text-sm leading-6 lg:text-lg",
                    variant === "small" && "text-base",
                )}
            >
                {title}
            </span>
        </div>
    );
}
