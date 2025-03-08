"use client";

import { useState } from "react";

import { ArrowRight } from "lucide-react";

import { VacancySheet } from "@/components/modules/vacancy-sheet";
import { Career } from "@/types";

export function CareerVacancy({
    position,
    onClick,
}: Career & { onClick: () => void }) {
    return (
        <button
            className="group flex w-full cursor-pointer flex-row items-center justify-between gap-2.5 border-b-[1px] border-b-gray-light pb-5"
            onClick={() => onClick()}
        >
            <p className="text-xl">{position}</p>
            <ArrowRight className="size-5 transition group-hover:translate-x-2" />
        </button>
    );
}

interface CareerVacanciesTemplate {
    vacancies?: Career[];
}
export function CareerVacanciesTemplate({
    vacancies,
}: CareerVacanciesTemplate) {
    const [openVacancySheet, setOpenVacancySheet] = useState(false);
    const [vacancy, setVacancy] = useState<Career | null>(null);

    return (
        <section className="py-[50px] lg:py-[60px]" id="vacancies">
            <div className="container">
                <div className="relative flex w-full flex-col gap-8 lg:gap-10">
                    <div className="flex w-full flex-col gap-[40px] lg:flex-row lg:gap-[30px]">
                        <h1 className="flex w-full text-[26px] font-bold leading-tight lg:mb-[250px] lg:max-w-[300px] lg:text-[28px]">
                            Вакансии
                        </h1>
                        <div className="flex flex-1 flex-col gap-5">
                            {vacancies?.map((vacancy) => (
                                <CareerVacancy
                                    key={vacancy.id}
                                    {...vacancy}
                                    onClick={() => {
                                        setVacancy(vacancy);
                                        setOpenVacancySheet(true);
                                    }}
                                />
                            ))}
                            <div className="flex w-full rounded bg-gray-bg p-4 lg:px-8 lg:py-5">
                                <p className="text-base lg:text-xl">
                                    Нет подходящей вакансии? Отправьте нам свое
                                    резюме в форму ниже
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="bottom-0 left-0 flex w-full flex-col lg:absolute lg:max-w-[300px]">
                        <span className="mb-[20px] text-lg text-gray lg:max-w-[205px]">
                            Руководитель по подбору персонала
                        </span>
                        <Link
                            className="text-xl font-medium"
                            href="tel:+74954000000"
                        >
                            +7 (495) 400 00 00
                        </Link>
                        <Link
                            className="text-xl font-medium"
                            href="mailto:lennar.rabota@mail.ru"
                        >
                            lennar.rabota@mail.ru
                        </Link>
                    </div> */}
                </div>
            </div>
            <VacancySheet
                open={openVacancySheet}
                onClose={() => setOpenVacancySheet(false)}
                vacancy={vacancy}
            />
        </section>
    );
}
