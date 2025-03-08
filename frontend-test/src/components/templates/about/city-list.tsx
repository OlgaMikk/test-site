"use client";

import { Spinner } from "@/components/modules/spinner";
import { useCities } from "@/hooks/api";

export function CityList() {
    const { cities, isLoading } = useCities();

    if (isLoading) {
        return (
            <div className="container flex flex-col items-center justify-center lg:h-[420px]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container flex flex-col gap-5 p-5 lg:min-h-[360px]">
            {cities?.map((city) => (
                <RegionItem key={city.id} title={city.title} />
            ))}
        </div>
    );
}

interface RegionItemProps {
    title: string;
}
function RegionItem({ title }: RegionItemProps) {
    if (title) {
        return (
            <div className="flex flex-row gap-2.5">
                <div className="flex size-6 shrink-0 rounded-sm bg-gray" />
                <span className="text-xl leading-tight">{title}</span>
            </div>
        );
    }
    return null;
}
