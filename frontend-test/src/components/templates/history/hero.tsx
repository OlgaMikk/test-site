"use client";

import Image from "next/image";

export function HistoryHeroTemplate() {
    return (
        <section className="pb-[40px] lg:pb-[60px]">
            <div className="relative mx-auto flex min-h-[620px] w-full max-w-[1980px] bg-background">
                <div className="container z-20 pb-[80px] pt-[360px] lg:pb-[140px] lg:pt-[240px]">
                    <div className="flex flex-col gap-1 text-white lg:gap-3">
                        <span className="mb-2 text-base lg:text-lg">
                            О компании
                        </span>
                        <h1 className="font-sans text-5xl lg:text-7xl">
                            lennar group — <br /> это Ответственность{" "}
                        </h1>
                        <p className="text-base lg:text-3xl">
                            Перед людьми, пространством и временем
                        </p>
                    </div>
                </div>
                <Image
                    className="absolute z-0 size-full object-cover"
                    fill
                    src={"/images/history/history.png"}
                    alt="История компании"
                />
                <div className="absolute inset-0 z-10 size-full bg-gradient-to-t from-black/80 to-transparent lg:bg-gradient-to-r " />
            </div>
        </section>
    );
}
