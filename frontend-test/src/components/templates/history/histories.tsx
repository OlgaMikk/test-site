"use client";

import { useEffect, useMemo } from "react";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { YearSwiper } from "@/components/modules/year-swiper";
import { CompanyHistory, CompanyHistoryBlock, Year } from "@/types";
import { cn } from "@/utils/cn";

function History({ title, description, image }: CompanyHistoryBlock) {
    return (
        <div className="flex w-full flex-col gap-5 md:flex-row">
            <div className="flex size-full max-h-[256px] flex-1 overflow-hidden rounded">
                <Image
                    src={image}
                    alt=""
                    width={500}
                    height={500}
                    className="size-full object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col gap-2 md:gap-3">
                <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
                <p className="text-lg">{description}</p>
            </div>
        </div>
    );
}
interface HistoriesTemplateProps {
    historyData?: CompanyHistory[];
    years?: Year[];
}
export function HistoriesTemplate({
    historyData: data,
    years: yearsData,
}: HistoriesTemplateProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const currentYear = searchParams.get("year")
        ? searchParams.get("year")
        : String(yearsData?.at(-1)?.year);

    const onProjectTypeChange = (year: string) => {
        router.push(pathname + "?" + `year=${year}`, {
            scroll: false,
        });
    };

    const years = useMemo(() => {
        return yearsData
            ?.map((item) => item.year)
            .reduce((acc, item) => {
                if (acc.includes(item)) {
                    return acc;
                }
                return [...acc, item];
            }, [] as number[])
            .map((item) => ({ value: String(item), title: <>{item}</> }));
    }, [yearsData]);

    const currentHistoryPage = useMemo(() => {
        if (Number(currentYear)) {
            return data?.find((item) => String(item.year) === currentYear);
        }
        return data?.at(0) ? data.at(0) : undefined;
    }, [currentYear, data]);

    useEffect(() => {
        if (currentYear) {
            onProjectTypeChange(currentYear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="overflow-hidden py-[40px] lg:py-[60px]">
            <div className="container">
                <div className="flex w-full flex-col gap-10 lg:flex-row lg:gap-8">
                    {years?.length ? (
                        <>
                            <div className="hidden flex-col gap-8 border-r border-r-gray-light px-4 lg:flex xl:px-10">
                                {years?.map((item) => (
                                    <button
                                        key={item.value}
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
                                    </button>
                                ))}
                            </div>
                            <div className="hidden w-full flex-col gap-5 max-lg:flex">
                                <YearSwiper
                                    list={years}
                                    currentYear={currentYear}
                                    onProjectTypeChange={(year) =>
                                        onProjectTypeChange(year)
                                    }
                                />
                                <div className="flex h-[1px] w-[calc(100%+16px)] bg-gray-light" />
                            </div>
                        </>
                    ) : null}
                    <div className="flex flex-1 flex-col gap-16">
                        <div className="flex w-full flex-col gap-2">
                            <p className="text-[26px] font-bold lg:text-3xl">
                                {currentHistoryPage?.title}
                            </p>
                            <h2 className="text-[20px]">
                                {currentHistoryPage?.subtitle}
                            </h2>
                        </div>
                        <div className="flex w-full flex-col gap-8">
                            {currentHistoryPage?.blocks.map((history) => (
                                <History key={history.title} {...history} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
