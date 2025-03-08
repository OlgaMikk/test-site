"use client";

import { useMemo, useRef } from "react";

import Image from "next/image";
import {
    Swiper as SwiperComponent,
    SwiperRef,
    SwiperSlide,
} from "swiper/react";

import { Employee } from "@/types";

interface TeamTemplateProps {
    employees?: Employee[];
}
export function TeamTemplate({ employees }: TeamTemplateProps) {
    const sliderRef = useRef<SwiperRef>(null);

    const ordinaryEmployees = useMemo(() => {
        return employees?.filter((item) => item.type === "ordinary");
    }, [employees]);

    const supervisorEmployees = useMemo(() => {
        return employees?.filter((item) => item.type === "supervisor");
    }, [employees]);

    return (
        <section className="overflow-hidden py-[50px] lg:py-[60px]">
            <div className="container">
                <div className="flex w-full flex-col gap-[100px] lg:gap-[70px]">
                    {supervisorEmployees?.length ? (
                        <div className="flex w-full flex-col gap-[40px] lg:gap-[50px]">
                            <h2 className="text-[26px] font-bold lg:text-[28px]">
                                Руководство
                            </h2>
                            {supervisorEmployees?.map((item) => (
                                <div
                                    className="flex w-full flex-col gap-[30px] lg:flex-row lg:gap-[40px]"
                                    key={item.id}
                                >
                                    <div className="flex h-[340px] w-full overflow-hidden rounded bg-gray-light lg:h-[450px] lg:w-[420px]">
                                        <Image
                                            src={item.photo}
                                            width={450}
                                            height={450}
                                            className="size-full object-cover"
                                            alt={item.full_name}
                                        />
                                    </div>
                                    <div className="relative flex flex-1 flex-col ">
                                        <div className="mb-4 flex h-[26px] w-[28px] shrink-0 lg:mb-8 lg:mt-4 lg:h-[40px] lg:w-[50px]">
                                            <Image
                                                width={50}
                                                height={40}
                                                src={"/images/team/quote.svg"}
                                                alt=""
                                            />
                                        </div>
                                        <p className="text-base leading-tight lg:text-[20px]">
                                            {item.quote}
                                        </p>
                                        <div className="my-2 ml-auto flex h-[26px] w-[28px] shrink-0 rotate-180 lg:h-[40px] lg:w-[50px]">
                                            <Image
                                                width={50}
                                                height={40}
                                                src={"/images/team/quote.svg"}
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex w-full flex-col gap-1">
                                            <span className="text-base font-medium text-gray lg:text-lg">
                                                {item.position}
                                            </span>
                                            <p className="text-lg font-medium leading-tight lg:text-[20px]">
                                                {item.full_name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}

                    {ordinaryEmployees?.length ? (
                        <div className="flex w-full flex-col gap-[40px] lg:gap-[50px]">
                            <h2 className="text-[26px] font-bold lg:text-[28px]">
                                Команда
                            </h2>
                            <SwiperComponent
                                direction="horizontal"
                                slidesPerView="auto"
                                ref={sliderRef}
                                breakpoints={{
                                    0: {
                                        spaceBetween: 10,
                                    },
                                    1024: {
                                        spaceBetween: 20,
                                    },
                                }}
                                className="flex w-full cursor-pointer overflow-visible"
                            >
                                {ordinaryEmployees.map((item) => (
                                    <SwiperSlide
                                        key={`team-${item.id}`}
                                        className="flex w-[255px] flex-col gap-3"
                                    >
                                        <div className="flex h-[320px] w-full overflow-hidden rounded bg-gray-light">
                                            <Image
                                                src={item.photo}
                                                width={255}
                                                height={320}
                                                className="size-full object-cover"
                                                alt={item.full_name}
                                            />
                                        </div>
                                        <div className="flex w-full flex-col gap-1.5">
                                            <p className="break-words text-lg leading-tight">
                                                {item.full_name}
                                            </p>
                                            <span className="break-words  text-lg leading-tight text-gray">
                                                {item.position}
                                            </span>
                                            <span className="break-words  text-lg leading-tight text-gray">
                                                {item.phone}
                                            </span>
                                            <span className="break-words  text-lg leading-tight text-gray">
                                                {item.email}
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </SwiperComponent>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
