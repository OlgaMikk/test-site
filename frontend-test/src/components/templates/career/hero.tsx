"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function CareerHeroTemplate() {
    const { push } = useRouter();
    return (
        <section className="pb-[50px] lg:pb-[60px]">
            <div className="relative mx-auto flex min-h-[620px] w-full max-w-[1980px] flex-col bg-background">
                <div className="container flex flex-1">
                    <div className="relative my-auto flex w-full max-w-[480px] flex-col pb-[40px] pt-[60px] text-black md:p-0">
                        <span className="mb-2 text-sm md:text-lg">
                            Карьера в холдинге
                        </span>
                        <h1 className="mb-4 font-sans text-[50px] leading-tight md:text-[70px]">
                            lennar group
                        </h1>
                        <p className="max-w-[480px] text-lg">
                            Ищем лучших сотрудников в лучшую команду.
                            Для&nbsp;реализации самых смелых идей мы ищем
                            уникальных специалистов, которые хотят развиваться
                            вместе с нами и достигать выдающихся результатов
                        </p>
                        <Button
                            onClick={() => {
                                push("#vacancies");
                            }}
                            size="lg"
                            className="mt-8 h-[60px] max-md:max-w-[200px]"
                        >
                            Смотреть вакансии
                        </Button>
                    </div>
                </div>
                <div className="relative right-0 flex h-[330px] w-full md:absolute md:h-full md:w-1/3 lg:w-1/2">
                    <Image
                        className="size-full object-cover"
                        fill
                        src={"/images/career/hero.png"}
                        alt="Карьера"
                    />
                </div>
            </div>
        </section>
    );
}
