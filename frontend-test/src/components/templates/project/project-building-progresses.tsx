"use client";

import { Dispatch, useMemo, useRef, useState } from "react";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import {
    Swiper as SwiperComponent,
    SwiperRef,
    SwiperSlide,
} from "swiper/react";

import { ProjectDrawer } from "@/components/modules/project-drawer";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BuildingProgress, Projects } from "@/types";
import { cn } from "@/utils/cn";
import { getMonth } from "@/utils/month";

interface ProjectBuildingProgressProps {
    buildingProgress: BuildingProgress;
    setBuildingProgress: Dispatch<BuildingProgress>;
}
export function ProjectBuildingProgress({
    buildingProgress: data,
    setBuildingProgress,
}: ProjectBuildingProgressProps) {
    const month = getMonth(data?.month);

    const hasImages = Boolean(data.images.length);

    return (
        <button
            className={cn(
                "relative flex h-[400px] w-full overflow-hidden rounded bg-white",
                hasImages && "!cursor-default",
            )}
            onClick={() => (hasImages ? setBuildingProgress(data) : undefined)}
        >
            <div className="absolute left-0 top-0 z-0 size-full animate-pulse bg-black/20" />
            {data?.images[0]?.image ? (
                <Image
                    fill
                    src={data?.images[0].image}
                    alt={data?.images[0].image}
                    className="object-cover"
                />
            ) : null}
            <div className="absolute left-4 top-4 z-20 rounded bg-white p-2.5">
                <span className="text-base font-medium">
                    {data?.images.length || 0} фото
                </span>
            </div>
            <div className="absolute bottom-4 left-4 z-20 rounded bg-black/35 p-2.5">
                <span className="text-base font-medium text-white">
                    {month} {data?.year}
                </span>
            </div>
            <div className="absolute left-0 top-0 z-10 size-full bg-black/20" />
        </button>
    );
}

interface ProjectBuildingProgressesProps {
    projectData?: Projects;
}
export function ProjectBuildingProgresses({
    projectData: data,
}: ProjectBuildingProgressesProps) {
    const [buildingProgress, setBuildingProgress] = useState<
        BuildingProgress | undefined
    >(undefined);

    const [year, setYear] = useState<number | null>(null);

    const buildingProgresses = useMemo<BuildingProgress[]>(() => {
        if (!data?.building_progresses?.length) {
            return [];
        }
        if (year) {
            return data.building_progresses.filter(
                (item) => item.year === year,
            );
        }
        return data.building_progresses;
    }, [year, data?.building_progresses]);

    const options = useMemo(() => {
        return data?.building_progresses
            ?.map((item) => item.year)
            ?.reduce<{ value: null | number; label: string }[]>(
                (acc, item) => {
                    if (acc.some((it) => it.value === item)) {
                        return acc;
                    }
                    return [...acc, { value: item, label: String(item) }];
                },
                [{ value: null, label: "Все" }],
            );
    }, [data?.building_progresses]);

    const sliderRef = useRef<SwiperRef>(null);

    return buildingProgresses?.length ? (
        <section className="mx-auto max-w-[1980px] overflow-hidden bg-background py-[50px] lg:py-[60px]">
            <div className="container flex w-full flex-col gap-8">
                <h3 className="mb-1 text-left font-sans text-4xl lg:text-5xl">
                    Ход строительства
                </h3>
                <div className="flex w-full flex-row items-end justify-between">
                    {options?.length ? (
                        <div className="flex flex-col gap-2.5">
                            <span className="text-base font-medium">
                                Выберите год
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="group flex w-fit flex-row items-center gap-2 rounded-full bg-white px-3 py-1">
                                    {year ? year : "Все"}
                                    <ChevronDown className="flex size-5 shrink-0 transition group-data-[state=open]:rotate-180" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {options.map((year) => (
                                        <DropdownMenuItem
                                            key={year.value}
                                            onClick={() => setYear(year.value)}
                                        >
                                            {year.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : null}
                    <div className="ml-auto flex flex-row gap-2.5">
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            id="prev-provider-button"
                        >
                            <ChevronLeft className="mr-0.5" />
                        </Button>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            id="next-provider-button"
                        >
                            <ChevronRight className="ml-0.5" />
                        </Button>
                    </div>
                </div>

                <SwiperComponent
                    direction="horizontal"
                    slidesPerView={3}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        0: {
                            slidesPerView: "auto",
                        },
                    }}
                    ref={sliderRef}
                    spaceBetween={20}
                    className="flex size-full cursor-pointer overflow-visible"
                    modules={[Navigation]}
                    navigation={{
                        prevEl: "#prev-provider-button",
                        nextEl: "#next-provider-button",
                    }}
                >
                    {buildingProgresses.map((item) => (
                        <SwiperSlide key={item.id}>
                            <ProjectBuildingProgress
                                buildingProgress={item}
                                setBuildingProgress={setBuildingProgress}
                            />
                        </SwiperSlide>
                    ))}
                </SwiperComponent>
            </div>
            <ProjectDrawer
                title={data?.title}
                buildingProgress={buildingProgress}
                open={Boolean(buildingProgress)}
                onClose={() => setBuildingProgress(undefined)}
            />
        </section>
    ) : null;
}
