import { EstateObject } from "@/types";
import { plural } from "@/utils/plural";

export function BuildingCorpus({
    area_max,
    area_min,
    title,
    room_count,
    floor_count,
}: EstateObject) {
    return (
        <div className="flex w-full flex-col gap-2.5 rounded-lg max-lg:bg-gray-bg max-lg:p-4">
            <div className="hidden text-xl font-bold uppercase text-primary lg:block lg:text-2xl">
                {title}
            </div>

            <div className="relative grid grid-cols-2 flex-wrap gap-3 gap-x-8 lg:flex lg:gap-x-4">
                <div className="block text-xl font-bold uppercase text-primary lg:hidden lg:text-2xl">
                    {title}
                </div>

                <div className="flex flex-col">
                    <div className="text-xl font-semibold lg:text-2xl">
                        {area_min} - {area_max} м2
                    </div>
                    <div className="text-lg font-normal lg:text-base">
                        площадь
                    </div>
                </div>

                <div className="hidden text-xl text-gray lg:block lg:text-4xl">
                    /
                </div>

                <div className="flex flex-col">
                    <div className="text-xl font-semibold lg:text-2xl">
                        {room_count}
                    </div>
                    <div className="text-lg font-normal lg:text-base">
                        {plural(room_count || 1, [
                            "квартира",
                            "квартиры",
                            "квартир",
                        ])}
                    </div>
                </div>

                <div className="hidden text-xl text-gray lg:block lg:text-4xl">
                    /
                </div>

                <div className="flex flex-col">
                    <div className="text-xl font-semibold lg:text-2xl">
                        {floor_count || "1"}
                    </div>
                    <div className="text-lg font-normal lg:text-base">
                        {plural(floor_count || 1, ["этаж", "этажа", "этажей"])}
                    </div>
                </div>

                <div className="absolute inset-x-0 top-0 block h-1/2 w-full text-center text-xl text-primary lg:hidden lg:text-4xl">
                    /
                </div>
                <div className="absolute inset-x-0 top-1/2 mt-1 block h-1/2 text-center text-xl text-primary lg:hidden lg:text-4xl">
                    /
                </div>
            </div>
        </div>
    );
}
