"use client";

import { useCallback } from "react";

import { usePathname, useSearchParams } from "next/navigation";

import { usePagination } from "@/hooks/browser/use-pagination";

import { Pagination } from "../ui/pagination";

interface ProjectsPaginationProps {
    count: number | undefined;
    prev?: string | null;
    next?: string | null;
    pageSize?: number;
    onPaginationChange?: () => void;
}

export function ProjectsPagination({
    count: elementsCount,
    next,
    prev,
    pageSize = 3,
    onPaginationChange,
}: ProjectsPaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    const currentPage = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const pagination = usePagination({
        count: elementsCount || 0,
        currentPage: Number(currentPage) ?? 1,
        pageSize: pageSize,
        siblingCount: 1,
    });

    return elementsCount && elementsCount > pageSize ? (
        <Pagination>
            <Pagination.Content>
                <Pagination.Previous
                    aria-disabled={!prev}
                    disabled={!prev}
                    scroll={false}
                    href={prev ? `?${prev?.split("?").at(-1)}` : ""}
                    onClick={onPaginationChange}
                />

                {pagination.map((page, idx) => {
                    const href = `${pathname}?${createQueryString(
                        "page",
                        String(page),
                    )}`;

                    if (typeof page === "number") {
                        return (
                            <Pagination.Link
                                href={href}
                                key={page}
                                isActive={currentPage === page}
                                scroll={false}
                                onClick={onPaginationChange}
                            >
                                {page}
                            </Pagination.Link>
                        );
                    }

                    return <Pagination.Ellipsis key={`${page}-${idx}`} />;
                })}

                <Pagination.Next
                    aria-disabled={!next}
                    disabled={!next}
                    scroll={false}
                    href={next ? `?${next?.split("?").at(-1)}` : ""}
                    onClick={onPaginationChange}
                />
            </Pagination.Content>
        </Pagination>
    ) : undefined;
}
