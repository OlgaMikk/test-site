"use client";

import { Dispatch, useEffect, useRef, useState } from "react";

import { useYMaps, YMaps } from "@pbe/react-yandex-maps";
import Image from "next/image";
import ymaps from "yandex-maps";

import { ScrollArea } from "@/components/ui/scrollarea";
import { Projects } from "@/types";
import { cn } from "@/utils/cn";

interface ProjectLocationMapProps {
    projectData?: Projects;
}
export function ProjectLocationMap({
    projectData: data,
}: ProjectLocationMapProps) {
    const [map, setMap] = useState<ymaps.Map | null>(null);
    const [currentGeotag, setCurrentGeotag] = useState<string | null>(null);

    return data?.geotags?.length ? (
        <section className="py-[50px] lg:py-[60px]">
            <div className="container">
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="relative flex h-[300px] overflow-hidden rounded-lg bg-background max-lg:shrink-0 lg:h-[420px] lg:flex-1">
                        <YMaps
                            enterprise
                            query={{
                                apikey: "2a21b3f6-0f34-4c7e-96ae-39a5818bc759",
                                lang: "ru_RU",
                            }}
                        >
                            <YandexMap
                                projectData={data}
                                setMap={setMap}
                                map={map}
                                currentGeotag={currentGeotag}
                                setCurrentGeotag={(value) =>
                                    setCurrentGeotag(value)
                                }
                            />
                        </YMaps>
                    </div>
                    <div className="flex max-h-[320px] w-full rounded-lg bg-background lg:max-h-[420px] lg:w-[360px] ">
                        <div className="flex w-full shrink-0 flex-col p-6 pr-3">
                            <ScrollArea>
                                <div className="flex w-full flex-col gap-5">
                                    {data?.geotags?.map((item) => (
                                        <button
                                            onClick={() => {
                                                map?.setCenter([
                                                    Number(item.latitude),
                                                    Number(item.longitude),
                                                ]);
                                                map?.setZoom(16);
                                                setCurrentGeotag(
                                                    String(item.id),
                                                );
                                            }}
                                            key={item.id}
                                            className={cn(
                                                "flex w-fit flex-row items-center gap-2 transition hover:text-destructive",
                                                currentGeotag ===
                                                    String(item.id) &&
                                                    "text-destructive",
                                            )}
                                        >
                                            <Image
                                                className="size-5"
                                                width={20}
                                                height={20}
                                                src={item.icon.icon}
                                                alt={item.icon.title}
                                            />
                                            <p className="text-lg font-medium">
                                                {item.title}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : null;
}
interface YandexMapProps {
    projectData: Projects;
    map: ymaps.Map | null;
    setMap: Dispatch<ymaps.Map>;
    currentGeotag: string | null;
    setCurrentGeotag: (geotag: string) => void;
}
export function YandexMap({
    projectData: data,
    map,
    setMap,
    currentGeotag,
    setCurrentGeotag,
}: YandexMapProps) {
    const mapRef = useRef(null);
    const ymaps = useYMaps([
        "Map",
        "GeoObject",
        "control.ZoomControl",
        "control.FullscreenControl",
        "control.GeolocationControl",
        "templateLayoutFactory",
        "layout.ImageWithContent",
    ]);

    useEffect(() => {
        if (!ymaps || !mapRef.current) {
            return;
        }

        const map = new ymaps.Map(
            mapRef.current,
            {
                center: [Number(data?.latitude), Number(data?.longitude)],
                zoom: 5,
                type: "yandex#map",
            },
            {
                autoFitToViewport: "always",
                minZoom: 15,
                // restrictMapArea: true,
            },
        );
        const zoomControl = new ymaps.control.ZoomControl();
        map.controls.add(zoomControl);

        setMap(map);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ymaps]);

    useEffect(() => {
        if (!ymaps || !mapRef.current || !map) {
            return;
        }

        map.geoObjects.removeAll();

        const geotags = data.geotags || [];

        const coordinates = {
            coordinates: [Number(data?.latitude), Number(data?.longitude)],
        };
        const myGeoObject = new ymaps.GeoObject(
            {
                geometry: {
                    type: "Point",
                    ...coordinates,
                },
            },
            {
                iconLayout: "default#image",
                iconImageHref: data.icon || "/Place.png",
                iconImageSize: [40, 40],
                iconContentLayout: "cover",
                iconImageOffset: [-25, -25],
                hideIconOnBalloonOpen: false,
                balloonShadow: false,
                balloonPanelMaxMapArea: 0,
            },
        );
        map.geoObjects.add(myGeoObject);

        for (let i = 0; i < geotags.length; i++) {
            const geotag = geotags[i];
            const coordinates = {
                coordinates: [
                    Number(geotag.latitude),
                    Number(geotag.longitude),
                ],
            };

            const myGeoObject = new ymaps.GeoObject(
                {
                    geometry: {
                        type: "Point",
                        ...coordinates,
                    },
                },
                {
                    iconLayout: "default#image",
                    iconImageHref:
                        currentGeotag === String(geotag.id)
                            ? "/images/ymaps/selected-place.png"
                            : "/images/ymaps/place.png",
                    iconImageSize: [28, 28],
                    iconContentLayout: "cover",
                    iconImageOffset: [-14, -25],
                    hideIconOnBalloonOpen: false,
                    balloonShadow: false,
                    balloonPanelMaxMapArea: 0,
                },
            );
            myGeoObject.events.add(["click"], () => {
                map.setCenter([
                    Number(geotag.latitude),
                    Number(geotag.longitude),
                ]);
                map.setZoom(16);
                setCurrentGeotag(String(geotag.id));
            });
            map.geoObjects.add(myGeoObject);
        }
        setMap(map);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ymaps, mapRef.current, map, currentGeotag]);

    return (
        <div
            ref={mapRef}
            className="size-full overflow-hidden rounded-lg [&>ymaps>ymaps>ymaps>.ymaps-2-1-79-copyrights-pane]:!pointer-events-none [&>ymaps>ymaps>ymaps>.ymaps-2-1-79-copyrights-pane]:!opacity-0"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
