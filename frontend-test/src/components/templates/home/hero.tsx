"use client";

import { useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import {
    Swiper as SwiperComponent,
    SwiperRef,
    SwiperSlide,
} from "swiper/react";

import { buttonVariants } from "@/components/ui/button";
import { Jumbotron } from "@/types";
import { cn } from "@/utils/cn";

interface HomeHeroTemplateProps {
    jumbotron?: Jumbotron[];
}
export function HomeHeroTemplate({ jumbotron }: HomeHeroTemplateProps) {
    const sliderRef = useRef<SwiperRef>(null);

    return jumbotron?.length ? (
        <section className="pb-[100px] lg:pb-[120px]">
            <div className="relative mx-auto flex h-[620px] w-full max-w-[1980px]">
                <SwiperComponent
                    loop={jumbotron.length > 1}
                    autoplay={{ delay: 5000 }}
                    direction="horizontal"
                    slidesPerView={1}
                    ref={sliderRef}
                    spaceBetween={0}
                    className="flex size-full cursor-pointer"
                    modules={[Pagination, Autoplay]}
                    pagination={{
                        el: "#list-pagination",
                        clickable: true,
                    }}
                >
                    {jumbotron.map((item) => (
                        <SwiperSlide
                            key={item.id}
                            className="relative flex size-full"
                        >
                            {item.picture && item.title ? (
                                <Image
                                    priority
                                    fill
                                    sizes="(min-width: 320px) 100vw"
                                    className=" object-cover  brightness-75"
                                    src={item.picture}
                                    alt={item.title}
                                />
                            ) : (
                                <div className="absolute size-full animate-pulse bg-gray" />
                            )}
                            <div className="container relative z-10 flex size-full">
                                <div className="my-auto flex w-full flex-col gap-3 text-white md:w-1/2">
                                    <span className="text-[16px] leading-tight lg:text-[18px]">
                                        {item.subtitle}
                                    </span>
                                    <div className="mb-8 mt-1 flex flex-col gap-1">
                                        <h3 className="font-sans text-[48px] leading-none lg:text-[70px]">
                                            {item.title}
                                        </h3>
                                        <p className="text-[16px] leading-tight lg:text-[20px]">
                                            {item.description}
                                        </p>
                                    </div>
                                    <Link
                                        href={item.button_link}
                                        className={cn(
                                            "h-[52px] w-[160px]",
                                            buttonVariants({
                                                variant: "default",
                                            }),
                                        )}
                                    >
                                        Подробнее
                                    </Link>
                                </div>
                            </div>
                            {item.picture && item.title ? (
                                <div className="absolute inset-0 size-full bg-gradient-to-t from-black/80 to-transparent lg:bg-gradient-to-r " />
                            ) : undefined}
                        </SwiperSlide>
                    ))}
                </SwiperComponent>
                {jumbotron.length > 1 ? (
                    <div
                        id="list-pagination"
                        className={cn(
                            "absolute bottom-6 z-10 flex w-full flex-row flex-wrap justify-center gap-2.5 lg:bottom-10",
                            "[&>.swiper-pagination-bullet-active]:bg-white [&>span]:flex [&>span]:size-[10px] [&>span]:shrink-0 [&>span]:cursor-pointer [&>span]:rounded-full [&>span]:bg-white/50 [&>span]:transition",
                        )}
                    />
                ) : null}
            </div>
        </section>
    ) : null;
}
