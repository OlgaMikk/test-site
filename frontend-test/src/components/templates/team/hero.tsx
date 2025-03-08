"use client";

import Image from "next/image";

export function TeamHeroTemplate() {
    return (
        <section className="pb-[50px] lg:pb-[60px]">
            <div className="relative mx-auto flex min-h-[620px] w-full max-w-[1980px] flex-col bg-background">
                <div className="container flex flex-1">
                    <div className="relative mt-auto flex size-full flex-col justify-end gap-2.5 py-[60px] text-black md:ml-auto md:w-2/3 md:py-[100px] md:pl-[50px] lg:w-1/2">
                        <span className="z-20 mb-2 text-sm md:text-lg">
                            Команда
                        </span>
                        <h1 className="z-20 mb-4 font-sans text-5xl md:text-7xl">
                            lennar group
                        </h1>
                        <p className="z-20 max-w-[460px] text-lg">
                            Цель нашей команды на рынке недвижимости — поднимать
                            планку наших проектов и делать главной их
                            характеристикой качество и четкое соблюдение сроков
                            строительства
                        </p>
                        <div className="absolute left-1/2 h-[260px] w-[200px] translate-x-[-50%] max-md:bottom-[40px] md:h-[400px] md:w-[300px] lg:left-[340px]">
                            <Image
                                className="size-full object-contain"
                                fill
                                src={"/images/team/logo.svg"}
                                alt="История компании"
                            />
                        </div>
                    </div>
                </div>
                <div className="relative flex h-[330px] w-full md:absolute md:h-full md:w-1/3 lg:w-1/2">
                    <Image
                        className="size-full object-cover"
                        fill
                        src={"/images/team/hero.png"}
                        alt="Команда"
                    />
                </div>
            </div>
        </section>
    );
}
