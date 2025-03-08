"use client";

import { useMemo, useRef } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import {
    Swiper as SwiperComponent,
    SwiperRef,
    SwiperSlide,
} from "swiper/react";

import { Button } from "@/components/ui/button";
import { Partner } from "@/types";
import { cn } from "@/utils/cn";

export function PartnerItem({ title, description, image }: Partner) {
    return (
        <div className="group relative flex h-[150px] w-full overflow-hidden rounded bg-gray-bg transition duration-300 hover:shadow-lg">
            <div className="absolute z-0 flex size-full shrink-0 rounded p-8 transition duration-300 group-hover:opacity-0">
                <Image
                    src={image}
                    height={150}
                    width={300}
                    className="size-full object-contain"
                    alt={title}
                />
            </div>
            <div className="absolute z-20 flex size-full shrink-0 translate-y-8 flex-col gap-1.5 overflow-hidden rounded bg-gray-bg px-4 py-8  pb-0 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="line-clamp-1 text-base font-medium">{title}</h3>
                <p className="line-clamp-3">{description}</p>
            </div>
        </div>
    );
}

interface PartnersTemplateProps {
    partners?: Partner[];
}
export function PartnersTemplate({ partners: data }: PartnersTemplateProps) {
    const sliderRef = useRef<SwiperRef>(null);

    const modifiedPartners = useMemo(() => {
        const partners = [...(data || [])];

        const modified = [];

        while (partners.length) {
            const item = partners?.splice(0, 3);
            modified.push(item);
        }
        return modified;
    }, [data]);

    return (
        <section className="overflow-hidden py-[50px] lg:py-[60px]">
            <div className="container">
                <div className="flex w-full flex-col gap-[50px] lg:gap-[60px] ">
                    <div className="flex w-full flex-col items-start justify-between gap-[30px] lg:flex-row lg:items-end lg:gap-16">
                        <h1 className="font-sans text-[36px] leading-none lg:mb-[-10px] lg:text-[50px]">
                            Партнеры
                        </h1>
                    </div>
                    <div className="hidden w-full grid-cols-1 gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                        {data?.map((item) => (
                            <PartnerItem key={item.id} {...item} />
                        ))}
                    </div>
                    <div className="hidden w-full flex-col gap-[30px] max-sm:flex">
                        <SwiperComponent
                            direction="horizontal"
                            slidesPerView={1}
                            spaceBetween={20}
                            ref={sliderRef}
                            className="flex w-full cursor-pointer overflow-visible"
                            modules={[Navigation, Pagination]}
                            navigation={{
                                prevEl: "#prev-drawer-provider-button",
                                nextEl: "#next-drawer-provider-button",
                            }}
                            pagination={{
                                el: "#list-pagination",
                                clickable: true,
                            }}
                        >
                            {modifiedPartners.map((item, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="grid w-full gap-5">
                                        {item.map((partner) => (
                                            <PartnerItem
                                                key={partner.id}
                                                {...partner}
                                            />
                                        ))}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </SwiperComponent>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <Button
                                className="shrink-0"
                                size={"icon"}
                                variant={"outline"}
                                id="prev-drawer-provider-button"
                            >
                                <ChevronLeft className="mr-0.5" />
                            </Button>
                            <div
                                id="list-pagination"
                                className={cn(
                                    "flex w-fit flex-row flex-wrap justify-center gap-2.5 lg:bottom-10",
                                    "[&>.swiper-pagination-bullet-active]:bg-black [&>span]:flex [&>span]:size-[10px] [&>span]:shrink-0 [&>span]:cursor-pointer [&>span]:rounded-full [&>span]:bg-gray [&>span]:transition",
                                )}
                            />
                            <Button
                                className="shrink-0"
                                size={"icon"}
                                variant={"outline"}
                                id="next-drawer-provider-button"
                            >
                                <ChevronRight className="ml-0.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
