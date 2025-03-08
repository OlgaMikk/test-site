"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import {
    Swiper as SwiperComponent,
    SwiperRef,
    SwiperSlide,
} from "swiper/react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { BuildingProgress } from "@/types";

interface ProjectDrawerProps {
    title?: string;
    buildingProgress?: BuildingProgress;
    open: boolean;
    onClose: () => void;
}
export function ProjectDrawer({
    title,
    buildingProgress,
    open,
    onClose = () => undefined,
}: ProjectDrawerProps) {
    const [slide, setSlide] = useState<number>(1);

    const sliderRef = useRef<SwiperRef>(null);

    useEffect(() => {
        setSlide(1);
    }, [open]);

    return (
        <Drawer open={open} onClose={onClose}>
            <DrawerContent className="h-[95vh]">
                <div className="flex flex-1 flex-col gap-5 px-4 py-5 lg:px-10">
                    {title ? (
                        <h3 className="mb-2.5 text-left text-lg font-medium lg:text-xl">
                            {title}
                        </h3>
                    ) : null}
                    <SwiperComponent
                        direction="horizontal"
                        slidesPerView={1}
                        ref={sliderRef}
                        className="flex w-full flex-1 cursor-pointer overflow-hidden rounded bg-background"
                        modules={[Navigation]}
                        navigation={{
                            prevEl: "#prev-drawer-provider-button",
                            nextEl: "#next-drawer-provider-button",
                        }}
                        onSlideChange={(e) => setSlide(e.activeIndex + 1)}
                    >
                        {buildingProgress?.images &&
                            buildingProgress.images.map((image) => (
                                <SwiperSlide key={image.id}>
                                    <div className="flex flex-1">
                                        {image?.image ? (
                                            <Image
                                                fill
                                                src={image?.image}
                                                alt={image?.image}
                                                className="object-contain"
                                            />
                                        ) : null}
                                    </div>
                                </SwiperSlide>
                            ))}
                    </SwiperComponent>
                    <div className="mx-auto flex flex-row items-center gap-2.5">
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            id="prev-drawer-provider-button"
                        >
                            <ChevronLeft className="mr-0.5" />
                        </Button>
                        <span className="text-lg font-medium">
                            {slide} из {buildingProgress?.images.length || 0}
                        </span>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            id="next-drawer-provider-button"
                        >
                            <ChevronRight className="ml-0.5" />
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
