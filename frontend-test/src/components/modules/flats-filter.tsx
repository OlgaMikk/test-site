"use client";

import { ComponentPropsWithoutRef, useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

import { FilterValues } from "@/types/app";
import { cn } from "@/utils/cn";

import { Button } from "../ui/button";

interface FlatsFilterProps {
    filtersOptions: {
        housing: {
            id: number;
            title: string;
        }[];
        fromSquare: string;
        toSquare: string;
        fromRooms: string;
        toRooms: string;
        fromFloor: string;
        toFloor: string;
        fromPrice: string;
        toPrice: string;
    };
}

const filterInitialValues: FilterValues = {
    slug: "",
    housing: [],
    priceMin: "",
    priceMax: "",
    squareMin: "",
    squareMax: "",
    floorMin: "",
    floorMax: "",
    page: "1",
    pageSize: "9",
    roomsCount: [],
    roomsMin: "",
    roomsMax: "",
};

export function FlatsFilter({ filtersOptions }: FlatsFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [filterValues, setFilterValues] = useState(filterInitialValues);

    const applyFilter = () => {
        const nonEmptyFilterValues = Object.fromEntries(
            Object.entries(filterValues).filter(([, value]) => value !== ""),
        );

        const filterAsQueryString = queryString.stringify(
            nonEmptyFilterValues,
            { arrayFormat: "comma" },
        );

        router.push("?" + filterAsQueryString, {
            scroll: false,
        });
    };

    const resetFilter = () => {
        setFilterValues(filterInitialValues);

        router.push(pathname, {
            scroll: false,
        });
    };

    const parsedQuery = queryString.parse(
        searchParams.toString(),
    ) as FilterValues;

    useEffect(() => {
        if (Object.keys(parsedQuery).length) {
            const nonEmptyParsedFilterValues = Object.fromEntries(
                Object.entries(parsedQuery).filter(([, value]) => value),
            ) as FilterValues;

            setFilterValues({
                ...filterInitialValues,
                ...nonEmptyParsedFilterValues,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- set values only for first render
    }, []);

    const {
        housing,
        fromSquare,
        toSquare,
        fromFloor,
        toFloor,
        fromPrice,
        toPrice,
    } = filtersOptions;

    const fromRooms = 1;
    const toRooms = 5;

    const housingOptions = [{ id: "all", title: "Все" }, ...housing];
    const roomsCountOptions = [
        { id: "all", title: "Все" },
        { id: 0, title: "Студия" },
        ...Array.from({ length: toRooms - fromRooms + 1 }).map((_, index) => ({
            id: fromRooms + index,
            title: fromRooms + index,
        })),
    ];

    const onSelectMultiFilter = (id: string, optionKey: keyof FilterValues) => {
        const optionValue = filterValues[optionKey];

        if (Array.isArray(optionValue)) {
            if (id === "all") {
                setFilterValues((prev) => ({ ...prev, [optionKey]: [] }));
            } else {
                if (optionValue.includes(id)) {
                    setFilterValues((prev) => ({
                        ...prev,
                        [optionKey]: optionValue.filter((el) => el !== id),
                    }));
                } else {
                    setFilterValues((prev) => ({
                        ...prev,
                        [optionKey]: [...optionValue, id],
                    }));
                }
            }
        }
    };

    const highlightMultiFilterOption = (
        id: string,
        optionKey: keyof FilterValues,
    ) => {
        const itemChecked = filterValues[optionKey].includes(id);
        const emptyChecked = filterValues[optionKey].length === 0;
        const allOption = id === "all";

        return itemChecked || (emptyChecked && allOption);
    };

    return (
        <div className="flex flex-col flex-wrap gap-5 rounded-lg bg-gray-bg p-4 md:flex-row md:items-end md:p-10">
            <div className="flex w-fit flex-col gap-3">
                <div className="text-lg font-medium md:text-xl">
                    Корпус дома
                </div>
                <div className="flex min-h-11 flex-wrap items-center gap-4 rounded border border-gray bg-white p-1 py-2 md:gap-0">
                    {housingOptions.map((h) => (
                        <Button
                            key={h.id}
                            variant="ghost"
                            size="xs"
                            className={cn(
                                "rounded-none border-gray-light last-of-type:border-none max-md:active:text-primary-hover md:border-r md:hover:text-primary-hover",
                                highlightMultiFilterOption(
                                    String(h.id),
                                    "housing",
                                )
                                    ? "text-primary"
                                    : "text-foreground",
                            )}
                            onClick={() => {
                                onSelectMultiFilter(String(h.id), "housing");
                            }}
                        >
                            {h.title}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex w-fit flex-col gap-3">
                <div className="text-lg font-medium md:text-xl">Площадь</div>
                <div
                    className={cn(
                        "flex h-11 items-center rounded border border-gray bg-white p-2",
                    )}
                >
                    <div
                        className={cn(
                            "text-base transition duration-500",
                            filterValues.squareMin
                                ? "text-foreground"
                                : "text-gray",
                        )}
                    >
                        от
                    </div>
                    <FilterInput
                        className="md:w-16"
                        placeholder={fromSquare}
                        value={filterValues.squareMin}
                        onChange={(e) => {
                            const inputValue = e.target.value.replace(
                                /\D/g,
                                "",
                            );

                            setFilterValues((prev) => ({
                                ...prev,
                                squareMin: inputValue,
                            }));
                        }}
                    />
                    <div
                        className={cn(
                            "text-base",
                            filterValues.squareMax
                                ? "text-foreground"
                                : "text-gray",
                        )}
                    >
                        до
                    </div>
                    <FilterInput
                        className="md:w-16"
                        placeholder={toSquare}
                        value={filterValues.squareMax}
                        onChange={(e) => {
                            const inputValue = e.target.value.replace(
                                /\D/g,
                                "",
                            );

                            setFilterValues((prev) => ({
                                ...prev,
                                squareMax: inputValue,
                            }));
                        }}
                    />
                    <div
                        className={cn(
                            "text-base",
                            filterValues.squareMax
                                ? "text-foreground"
                                : "text-gray",
                        )}
                    >
                        м²
                    </div>
                </div>
            </div>

            <div className="flex w-fit flex-col gap-3">
                <div className="text-lg font-medium md:text-xl">Этаж</div>
                <div
                    className={cn(
                        "flex h-11 items-center rounded border border-gray bg-white p-2",
                    )}
                >
                    <div
                        className={cn(
                            "text-sm transition duration-500 md:text-base",
                            filterValues.floorMin
                                ? "text-foreground"
                                : "text-gray",
                        )}
                    >
                        c
                    </div>
                    <FilterInput
                        className="md:w-14"
                        placeholder={fromFloor}
                        value={filterValues.floorMin}
                        onChange={(e) => {
                            const inputValue = e.target.value.replace(
                                /\D/g,
                                "",
                            );

                            setFilterValues((prev) => ({
                                ...prev,
                                floorMin: inputValue,
                            }));
                        }}
                    />
                    <div
                        className={cn(
                            "text-sm transition duration-500 md:text-base",
                            filterValues.floorMax
                                ? "text-foreground"
                                : "text-gray",
                        )}
                    >
                        по
                    </div>
                    <FilterInput
                        className="md:w-14"
                        placeholder={toFloor}
                        value={filterValues.floorMax}
                        onChange={(e) => {
                            const inputValue = e.target.value.replace(
                                /\D/g,
                                "",
                            );

                            setFilterValues((prev) => ({
                                ...prev,
                                floorMax: inputValue,
                            }));
                        }}
                    />
                </div>
            </div>

            <div className="flex w-fit flex-col gap-3">
                <div className="text-lg font-medium md:text-xl">Цена</div>
                <div
                    className={cn(
                        "flex h-11 items-center rounded border border-gray bg-white p-2",
                    )}
                >
                    <div
                        className={cn(
                            "text-sm transition duration-500 md:text-base",
                            filterValues.priceMin
                                ? "text-foreground"
                                : "text-gray",
                        )}
                    >
                        от
                    </div>
                    <FilterInput
                        placeholder={new Intl.NumberFormat("ru-RU").format(
                            Number(fromPrice),
                        )}
                        value={
                            filterValues.priceMin &&
                            filterValues.priceMin !== ""
                                ? new Intl.NumberFormat("ru-RU").format(
                                      Number(filterValues.priceMin),
                                  )
                                : ""
                        }
                        onChange={(e) => {
                            const inputValue = e.target.value.replace(
                                /\D/g,
                                "",
                            );

                            setFilterValues((prev) => ({
                                ...prev,
                                priceMin: inputValue,
                            }));
                        }}
                    />
                    <div
                        className={cn(
                            "text-sm transition duration-500 md:text-base",
                            filterValues.priceMax
                                ? "text-foreground"
                                : "text-gray",
                        )}
                    >
                        до
                    </div>
                    <FilterInput
                        placeholder={new Intl.NumberFormat("ru-RU").format(
                            Number(toPrice),
                        )}
                        value={
                            filterValues.priceMax &&
                            filterValues.priceMax !== ""
                                ? new Intl.NumberFormat("ru-RU").format(
                                      Number(filterValues.priceMax),
                                  )
                                : ""
                        }
                        onChange={(e) => {
                            const inputValue = e.target.value.replace(
                                /\D/g,
                                "",
                            );

                            setFilterValues((prev) => ({
                                ...prev,
                                priceMax: inputValue,
                            }));
                        }}
                    />
                    <div
                        className={cn(
                            "text-sm transition duration-500 md:text-base",
                            filterValues.priceMin || filterValues.priceMax
                                ? "text-foreground"
                                : "text-gray",
                        )}
                    >
                        ₽
                    </div>
                </div>
            </div>

            <div className="flex w-fit flex-col gap-3">
                <div className="text-lg font-medium md:text-xl">
                    Количество комнат
                </div>
                <div className="flex min-h-11 flex-wrap items-center gap-2 rounded border border-gray bg-white p-1 py-2 md:gap-0">
                    {roomsCountOptions.map((h) => (
                        <Button
                            key={h.id}
                            variant="ghost"
                            size="xs"
                            className={cn(
                                "rounded-none border-gray-light last-of-type:border-none max-md:active:text-primary-hover md:border-r md:hover:text-primary-hover",
                                highlightMultiFilterOption(
                                    String(h.id),
                                    "roomsCount",
                                )
                                    ? "text-primary"
                                    : "text-foreground",
                            )}
                            onClick={() => {
                                onSelectMultiFilter(String(h.id), "roomsCount");
                            }}
                        >
                            {h.title}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex h-12 gap-3 md:items-end md:justify-end">
                <Button
                    className="bg-black"
                    onClick={() => {
                        applyFilter();
                    }}
                >
                    Применить
                </Button>
                <Button
                    variant="outline"
                    onClick={() => {
                        resetFilter();
                    }}
                >
                    Сбросить все
                </Button>
            </div>
        </div>
    );
}

function FilterInput({
    className,
    ...rest
}: ComponentPropsWithoutRef<"input">) {
    return (
        <input
            className={cn(
                "h-8 w-full rounded-lg p-2 text-center text-base text-foreground outline-none md:w-36 md:text-xl",
                className,
            )}
            {...rest}
        />
    );
}
