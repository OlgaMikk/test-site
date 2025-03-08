import { LocationAdvantage } from "@/components/modules/location-advantage";
import { Projects } from "@/types";

interface ProjectLocationAdvantageProps {
    projectData?: Projects;
}
export function ProjectLocationAdvantage({
    projectData: data,
}: ProjectLocationAdvantageProps) {
    return data?.advantages.length ? (
        <section className="pb-[50px] pt-[30px] lg:py-[60px]">
            <div className="container flex w-full flex-row flex-wrap justify-center gap-x-4 gap-y-16 lg:gap-8">
                {data?.advantages?.map((a) => (
                    <LocationAdvantage
                        key={a.id}
                        icon={a.icon.icon}
                        title={a.title}
                    />
                ))}
            </div>
        </section>
    ) : null;
}
