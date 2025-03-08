"use client";

import { ChevronDown } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Projects, Year } from "@/types";

interface NewsFiltersProps {
    year: string;
    years?: Year[];
    onNewsParamsChange: (year: string, project: string) => void;
    projects?: Projects[];
    currentProject?: Projects;
}
export function NewsFilters({
    year,
    years: yearsData,
    onNewsParamsChange,
    projects,
    currentProject,
}: NewsFiltersProps) {
    return (
        <div className="mb-[-3px] ml-auto flex h-fit flex-row flex-wrap items-center gap-5 max-lg:w-full">
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="group flex size-fit flex-row items-center gap-2 disabled:pointer-events-none disabled:opacity-60"
                    disabled={!yearsData?.length}
                >
                    <span>{year ? year : "Все"}</span>
                    <ChevronDown className="flex size-5 shrink-0 transition group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {yearsData?.map((item) => (
                        <DropdownMenuItem
                            key={item.year}
                            onClick={() =>
                                onNewsParamsChange(
                                    String(item.year),
                                    String(currentProject?.id),
                                )
                            }
                        >
                            {item.year}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger
                    disabled={!projects?.length}
                    className="group flex size-fit max-w-[150px] flex-row items-center gap-2 disabled:pointer-events-none disabled:opacity-60"
                >
                    <span className="truncate">
                        {currentProject ? currentProject.title : "Проект"}
                    </span>
                    <ChevronDown className="flex size-5 shrink-0 transition group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {projects?.map((item) => (
                        <DropdownMenuItem
                            key={item.id}
                            onClick={() =>
                                onNewsParamsChange(year, String(item?.id))
                            }
                        >
                            {item.title}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <button
                className="h-fit p-0 disabled:pointer-events-none disabled:opacity-60"
                disabled={!currentProject && !year}
                onClick={() => {
                    onNewsParamsChange("", "");
                }}
            >
                Сбросить фильтры
            </button>
        </div>
    );
}
