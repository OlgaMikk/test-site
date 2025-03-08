"use client";

import { ProjectCard } from "@/components/modules/project-card";
import { Swiper } from "@/components/modules/swiper";
import { Projects } from "@/types";

const typeList = [
    {
        value: "business_space",
        title: <>Бизнес-Пространства</>,
    },
    {
        value: "housing",
        title: <>Жилье</>,
    },
];
export function AboutProjects({ projectList }: { projectList?: Projects[] }) {
    return (
        <section className="container flex w-full flex-col gap-6 py-[50px] md:gap-[70px] md:py-[60px]">
            <Swiper list={typeList} />
            {projectList?.length ? (
                <div className="grid grid-cols-1 gap-x-[20px] gap-y-[50px] sm:grid-cols-2">
                    {projectList.map((project) => (
                        <ProjectCard
                            key={`project-${project.id}`}
                            {...project}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex w-full items-center justify-center py-[50px]">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-center text-base uppercase leading-normal">
                            Объектов недвижимости пока нет, <br />
                            Попробуйте обновить список!
                        </span>
                    </div>
                </div>
            )}
        </section>
    );
}
