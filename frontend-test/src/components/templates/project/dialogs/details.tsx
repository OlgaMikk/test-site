import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FlatType } from "@/types";
import { cn } from "@/utils/cn";

export function FlatDetails({
    flatInfo,
    onReserve,
}: {
    flatInfo?: FlatType;
    onReserve: () => void;
}) {
    return (
        <div
            className={cn(
                "flex flex-col items-start",
                "lg:flex-row lg:gap-x-8",
            )}
        >
            <div
                className={cn(
                    "relative mb-3 h-56 w-full rounded-lg",
                    "lg:h-[500px] lg:w-1/2 lg:overflow-hidden",
                )}
            >
                {flatInfo ? (
                    <Image
                        src={flatInfo.layout.image}
                        alt={flatInfo.layout.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1920px) 100vw"
                        priority
                    />
                ) : (
                    <div className="absolute size-full animate-pulse bg-gray-light" />
                )}
            </div>

            <div
                className={cn(
                    "flex w-full flex-col justify-between gap-y-3 lg:grow",
                    "lg:h-[500px] lg:w-1/2",
                )}
            >
                <div
                    className={cn(
                        "text-base font-medium uppercase",
                        "lg:mb-6 lg:text-2xl",
                    )}
                >
                    Планировка квартиры №{flatInfo?.flat},{" "}
                    {flatInfo?.estate_object}
                </div>
                <div className="mb-2 flex flex-col gap-y-1.5 lg:mb-5">
                    <div className="text-sm uppercase lg:text-lg">
                        Стоимость:
                    </div>
                    <div className="text-sm font-bold lg:text-3xl">
                        {flatInfo?.price
                            ? new Intl.NumberFormat("ru-RU").format(
                                  Number(flatInfo?.price),
                              )
                            : ""}{" "}
                        ₽
                    </div>
                </div>
                <div
                    className={cn(
                        "mb-2 flex w-full flex-col gap-3 rounded border border-gray-light p-3",
                        "xl:mb-3.5 xl:w-3/4 xl:gap-y-3.5 xl:rounded-lg xl:p-5",
                    )}
                >
                    <FlatSpec spec="Корпус" value={flatInfo?.estate_object} />
                    <FlatSpec spec="Этаж" value={flatInfo?.floor} />
                    <FlatSpec
                        spec="Кол-во комнат"
                        value={flatInfo?.layout.room}
                    />
                    <FlatSpec spec="Площадь" value={flatInfo?.layout.square} />
                </div>

                <Button className="mt-auto w-full lg:w-3/4" onClick={onReserve}>
                    Забронировать
                </Button>
            </div>
        </div>
    );
}

export function FlatSpec({
    spec,
    value,
}: {
    spec: string;
    value?: string | number;
}) {
    return (
        <div
            className={cn(
                "flex w-full justify-between border-b border-gray-light pb-1.5 text-sm last-of-type:border-none last-of-type:pb-0",
                "lg:pb-3.5 lg:text-xl",
            )}
        >
            <span>{spec}:</span>
            <span className="font-bold">{value}</span>
        </div>
    );
}
