import * as React from "react";

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

const PaginationWrapper = ({
    className,
    ...props
}: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
);

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, "size"> &
    React.ComponentProps<typeof Link>;

const PaginationLink = ({
    className,
    isActive,
    ...props
}: PaginationLinkProps) => (
    <PaginationItem>
        <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(
                buttonVariants({
                    variant: isActive ? "default" : "outline",
                    size: "icon",
                }),
                className,
            )}
            {...props}
        />
    </PaginationItem>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
    <PaginationLink
        aria-label="Перейти к прошлой странице"
        size="default"
        className={cn(
            "py-0",
            disabled
                ? "pointer-events-none border-gray-light text-gray-light"
                : "",
            className,
        )}
        {...props}
    >
        <ChevronLeft size={16} />
    </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationStart = ({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
    <PaginationLink
        aria-label="Перейти к первой странице"
        size="default"
        className={cn(
            "block",
            disabled
                ? "pointer-events-none border-gray-light text-gray-light"
                : "",
            className,
        )}
        {...props}
    >
        <ChevronsLeft className="m-auto h-full" size={16} />
    </PaginationLink>
);
PaginationPrevious.displayName = "PaginationStart";

const PaginationNext = ({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
    <PaginationLink
        aria-label="Перейти к следующей странице"
        size="default"
        className={cn(
            "py-0",
            disabled
                ? "pointer-events-none border-gray-light text-gray-light"
                : "",
            className,
        )}
        {...props}
    >
        <ChevronRight size={16} />
    </PaginationLink>
);
const PaginationEnd = ({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
    <PaginationLink
        aria-label="Перейти к последней странице"
        size="default"
        className={cn(
            "block",
            disabled
                ? "pointer-events-none border-gray-light text-gray-light"
                : "",
            className,
        )}
        {...props}
    >
        <ChevronsRight className="m-auto h-full" size={16} />
    </PaginationLink>
);
PaginationPrevious.displayName = "PaginationEnd";

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span"> & Pick<ButtonProps, "size">) => (
    <span
        aria-hidden
        className={cn(
            buttonVariants({
                variant: "outline",
                size: "icon",
            }),
            "pointer-events-none",
            className,
        )}
        {...props}
    >
        <MoreHorizontal className="size-4" />
        <span className="sr-only">More pages</span>
    </span>
);

export const Pagination = Object.assign(PaginationWrapper, {
    Content: PaginationContent,
    Ellipsis: PaginationEllipsis,
    Item: PaginationItem,
    Link: PaginationLink,
    Next: PaginationNext,
    Previous: PaginationPrevious,
    Start: PaginationStart,
    End: PaginationEnd,
});
