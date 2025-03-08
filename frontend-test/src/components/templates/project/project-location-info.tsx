import { TreeDeciduous } from "lucide-react";
import Image from "next/image";

import { LocationTimeAdvantage } from "@/components/modules/location-advantage";
import { Projects } from "@/types";

interface ProjectLocationInfoProps {
    projectData?: Projects;
}
export function ProjectLocationInfo({
    projectData: data,
}: ProjectLocationInfoProps) {
    const location = data?.location;
    return location ? (
        <section className="container relative flex min-h-[400px] max-w-[1180px] flex-col gap-8 px-0 py-[50px] lg:mt-8 lg:py-[60px]">
            <div className="container">
                <div className="relative z-10 flex w-full flex-col gap-4 lg:w-1/2">
                    <div className="flex flex-row items-center gap-1 text-gray-dark">
                        <TreeDeciduous className="size-5 text-gray-dark" />
                        <span className="text-lg">Расположение</span>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="font-sans text-4xl xl:text-5xl">
                            {location?.title}
                        </h3>
                        <p className="text-lg">{location?.description}</p>
                    </div>
                    <div className="mt-6 flex flex-row flex-wrap gap-x-8 gap-y-4">
                        {location?.routes?.map((a) => (
                            <LocationTimeAdvantage
                                key={a.id}
                                icon={a.icon}
                                title={a.destination}
                                subTitle={a.travel_time}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {location?.image && location.ya_maps_link ? (
                <div className="group left-0 top-0 z-0 flex w-full overflow-hidden max-lg:relative max-lg:min-h-[474px] lg:absolute lg:size-full lg:h-full">
                    <Image
                        fill
                        src={location?.image}
                        alt={data?.title || ""}
                        className="flex size-full object-cover lg:translate-x-52"
                    />

                    {/* <div className="absolute bottom-4 right-4 w-fit rounded border border-gray bg-white p-4 text-center text-xs font-semibold opacity-0 transition group-hover:opacity-100">
                        Смотреть расположение
                    </div> */}
                </div>
            ) : null}
        </section>
    ) : null;
}
