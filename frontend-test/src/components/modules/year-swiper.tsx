"use client";

import { useRef } from "react";

import {
    Swiper as SwiperComponent,
    SwiperRef,
    SwiperSlide,
} from "swiper/react";

import { cn } from "@/utils/cn";

interface SwiperProps {
    list?: { value: string; title: JSX.Element }[];
    currentYear: string | null;
    onProjectTypeChange: (year: string) => void;
}
export function YearSwiper({
    list,
    currentYear,
    onProjectTypeChange = () => undefined,
}: SwiperProps) {
    const sliderRef = useRef<SwiperRef>(null);

    return list?.length ? (
        <SwiperComponent
            direction="horizontal"
            slidesPerView="auto"
            ref={sliderRef}
            breakpoints={{
                320: {
                    spaceBetween: 40,
                },
            }}
            className="relative flex w-full cursor-pointer overflow-visible"
        >
            {list.map((item) => (
                <SwiperSlide
                    key={`swiper-${item.value}`}
                    className="flex w-fit flex-row items-center gap-8"
                >
                    <div
                        onClick={() => {
                            onProjectTypeChange(item.value);
                        }}
                        className={cn(
                            "flex h-8 w-20 items-center justify-center text-nowrap p-0 text-[24px] uppercase leading-none text-gray",
                            item.value === currentYear &&
                                "text-[28px] font-bold text-black",
                        )}
                    >
                        {item.title}
                    </div>
                </SwiperSlide>
            ))}
        </SwiperComponent>
    ) : null;
}
