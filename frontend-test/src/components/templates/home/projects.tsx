"use client";

import { useRef } from "react";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CitiesSelector, ProjectsPagination } from "@/components/modules";
import { Advantage } from "@/components/modules/advantage";
import { PageResult, Projects } from "@/types";
import { cn } from "@/utils/cn";

interface ProjectsTemplateProps {
    pageData?: PageResult;
}

export function ProjectsTemplate({ pageData }: ProjectsTemplateProps) {
    const projects = pageData?.results;

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const onPaginationChange = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="container mb-[50px] flex flex-col gap-6 lg:mb-[60px] lg:gap-12">
            <div
                ref={scrollRef}
                className="flex flex-col gap-x-8 lg:flex-row lg:items-center"
            >
                <div
                    className={cn(
                        "mt-2 font-sans text-4xl uppercase lg:text-[50px] lg:leading-[60px]",
                    )}
                >
                    Наши проекты
                </div>
                <div className="hidden text-5xl leading-[60px] text-primary lg:block">
                    /
                </div>
                <CitiesSelector />
            </div>

            <div className="flex flex-col gap-y-14">
                {projects?.length ? (
                    projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))
                ) : (
                    <div className="mx-auto max-w-56 text-center text-sm sm:text-lg lg:max-w-full">
                        В выбранном городе пока что нет проектов
                    </div>
                )}
            </div>

            <ProjectsPagination
                onPaginationChange={onPaginationChange}
                count={pageData?.count}
                next={pageData?.next}
                prev={pageData?.previous}
            />
        </section>
    );
}

function ProjectCard(project: Projects) {
    const {
        slug,
        address,
        image,
        short_description,
        title,
        featured_advantages,
        type,
    } = project;
    return (
        <Link
            href={`/project/${slug}`}
            className="group flex w-full flex-col gap-5"
        >
            <div className="relative h-56 overflow-hidden rounded transition">
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 1920px) 100vw"
                    className="object-cover duration-500 group-hover:scale-105"
                />
                {type === "housing" ? (
                    <div className="absolute bottom-4 right-4 rounded bg-white/20 p-3 backdrop-blur-sm">
                        <ArrowRightIcon
                            className="text-white transition group-hover:translate-x-1/4"
                            size={20}
                        />
                    </div>
                ) : undefined}
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold transition group-hover:text-primary lg:text-2xl xl:font-bold">
                    {title}
                </h3>

                <div
                    className={cn(
                        "flex flex-col gap-3.5",
                        "lg:flex-row lg:gap-5",
                    )}
                >
                    <div className="flex flex-col gap-3">
                        <div className="line-clamp-2 text-sm lg:text-lg">
                            {short_description}
                        </div>
                        <div className="text-sm text-gray lg:text-lg">
                            {address}
                        </div>
                    </div>
                </div>

                <div
                    className={cn(
                        "flex w-full flex-col gap-3",
                        "md:mt-3 md:flex-row",
                    )}
                >
                    {featured_advantages?.map((a) => (
                        <Advantage
                            withGrayBg
                            // className={cn(
                            //     advantages.length === 3 ? "w-full" : "w-fit",
                            // )}
                            key={a.id}
                            {...a}
                        />
                    ))}
                </div>
            </div>
        </Link>
    );
}
