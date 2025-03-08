"use client";

import { useCallback, useEffect, useState } from "react";

import { Check, ChevronDownCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCities } from "@/hooks/api";
import { cn } from "@/utils/cn";

import { Button } from "../ui/button";
import { Command } from "../ui/command";
import { Popover } from "../ui/popover";
import { Spinner } from "./spinner";

export function CitiesSelector() {
    const { cities, isLoading } = useCities();

    const [open, setOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            const currentCity = params.get("city");

            if (currentCity === value) {
                params.delete("city");
            } else {
                params.set(name, value);
            }

            params.set("page", "1");

            return params.toString();
        },
        [searchParams],
    );

    const parsedCity = searchParams.get("city");

    const onCitySelect = (value: string) => {
        setSelectedCity(value === selectedCity ? "" : value);
        setOpen(false);

        router.push(pathname + "?" + createQueryString("city", value), {
            scroll: false,
        });
    };

    useEffect(() => {
        if (parsedCity) {
            setSelectedCity(String(parsedCity));
        } else {
            onCitySelect("moskva");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parsedCity]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-start gap-x-2 p-0 text-lg outline-none ring-0"
                >
                    <span className="text-black">
                        {selectedCity
                            ? cities?.find(
                                  (city) => String(city.slug) === selectedCity,
                              )?.title
                            : "Выберите город"}
                    </span>
                    <ChevronDownCircle
                        className={cn(
                            "size-6 shrink-0 fill-primary text-primary transition-transform [&>path]:text-white",
                            open ? "rotate-180" : "rotate-0",
                        )}
                    />
                </Button>
            </Popover.Trigger>

            <Popover.Content className="w-[200px] p-0">
                {isLoading ? (
                    <Spinner className="m-auto my-5" />
                ) : (
                    <Command>
                        <Command.Input placeholder="Поиск города" />
                        <Command.Empty>Не найдено</Command.Empty>
                        <Command.Group>
                            {cities?.map((city) => (
                                <Command.Item
                                    key={city.id}
                                    value={String(city.title)}
                                    onSelect={() =>
                                        onCitySelect(String(city.slug))
                                    }
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 size-4",
                                            selectedCity === String(city.slug)
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {city.title}
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command>
                )}
            </Popover.Content>
        </Popover>
    );
}
