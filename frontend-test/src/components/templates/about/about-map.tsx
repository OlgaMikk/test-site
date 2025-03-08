import Image from "next/image";

import { cn } from "@/utils/cn";

import { CityList } from "./city-list";

export function AboutMap() {
    return (
        <section className="relative flex w-full flex-col gap-7 py-[50px] md:py-16 lg:gap-16">
            <h3 className="container text-center text-2xl font-bold uppercase leading-tight lg:text-3xl">
                Территория присутствия
            </h3>

            <div
                className={cn(
                    "h-full max-lg:container",
                    "max-lg:rounded-lg lg:absolute lg:inset-0 lg:-z-10 lg:mx-auto lg:h-[520px] lg:max-w-[1180px] lg:bg-gray-bg",
                )}
            >
                <div
                    className={cn(
                        "relative h-full max-lg:invisible",
                        "lg:absolute lg:right-[10%] lg:top-0 lg:block lg:w-[550px]",
                        "xl:w-[600px]",
                    )}
                >
                    <Image
                        src="/images/about/map.png"
                        fill
                        priority
                        alt="Изображение карты территории присутствия"
                        className="object-contain"
                    />
                </div>

                <div className="flex items-center justify-center rounded-lg bg-gray-bg p-10 lg:hidden">
                    <Image
                        src="/images/about/map.png"
                        width={400}
                        height={400}
                        alt="Изображение карты территории присутствия"
                        className="object-contain"
                    />
                </div>
            </div>

            <CityList />
        </section>
    );
}
