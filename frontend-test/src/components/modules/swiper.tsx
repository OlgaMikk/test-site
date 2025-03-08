"use client";

import { useRef } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Swiper as SwiperComponent,
    SwiperRef,
    SwiperSlide,
} from "swiper/react";

import { cn } from "@/utils/cn";

interface SwiperProps {
    list: { value: string; title: JSX.Element }[];
}
export function Swiper({ list }: SwiperProps) {
    const sliderRef = useRef<SwiperRef>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const currentType = searchParams.get("type")
        ? searchParams.get("type")
        : "housing";

    const onProjectTypeChange = (type: string) => {
        router.push(pathname + "?" + `type=${type}`, {
            scroll: false,
        });
    };
    return (
        <SwiperComponent
            direction="horizontal"
            slidesPerView="auto"
            ref={sliderRef}
            breakpoints={{
                320: {
                    spaceBetween: 24,
                },
                768: {
                    spaceBetween: 32,
                },
            }}
            className="relative flex w-full cursor-pointer"
        >
            {list.map((item, i) => (
                <SwiperSlide
                    key={`swiper-${item.value}`}
                    className="flex w-fit flex-row items-center gap-6 md:gap-8"
                >
                    <div
                        onClick={() => {
                            onProjectTypeChange(item.value);
                        }}
                        className={cn(
                            "text-nowrap border-b-[3px] p-0 font-sans text-3xl uppercase transition-all duration-150",
                            "md:text-4xl",
                            "lg:text-5xl lg:leading-normal",
                            item.value === currentType
                                ? "border-primary text-primary"
                                : "border-transparent text-gray",
                        )}
                    >
                        {item.title}
                    </div>
                    <span
                        className={cn(
                            "mb-2 font-mono text-3xl uppercase leading-none text-primary lg:mb-3",
                            "md:text-4xl",
                            "lg:text-5xl",
                            i === list.length - 1 && "opacity-0",
                        )}
                    >
                        /
                    </span>
                </SwiperSlide>
            ))}
            <div className="absolute bottom-0 right-0 z-10 flex h-full w-[50px] bg-gradient-to-l from-background to-transparent" />
        </SwiperComponent>
    );
}
