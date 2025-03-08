import Image from "next/image";
import Link from "next/link";

import { Advantage } from "@/components/modules";
import { buttonVariants } from "@/components/ui/button";
import { Projects } from "@/types";
import { cn } from "@/utils/cn";

interface ProjectInfoProps {
    projectData?: Projects;
}
export function ProjectInfo({ projectData }: ProjectInfoProps) {
    return (
        <section className="container py-[50px] lg:py-[60px]">
            <div className="flex w-full flex-col gap-8 lg:flex-row">
                <div className="my-auto flex w-full max-w-3xl flex-1 flex-col gap-6">
                    {projectData?.featured_advantages ? (
                        <div className="flex flex-row flex-wrap gap-5 gap-y-3">
                            {projectData?.featured_advantages?.map((a) => (
                                <Advantage
                                    variant="small"
                                    className="w-fit !p-0 text-base text-black"
                                    key={a.id}
                                    {...a}
                                />
                            ))}
                        </div>
                    ) : null}
                    <h3 className="font-sans text-4xl font-bold lg:text-5xl">
                        {projectData?.title}
                    </h3>
                    <p className="text-lg">{projectData?.description}</p>
                    {projectData?.tour_3d_url ? (
                        <Link
                            href={projectData.tour_3d_url}
                            target="_blank"
                            className={cn("mt-4 w-fit", buttonVariants())}
                        >
                            Смотреть 3D-тур
                        </Link>
                    ) : null}
                </div>
                {projectData?.short_description_image ? (
                    <div className="my-auto flex h-fit max-h-[400px] w-full flex-1 shrink-0 overflow-hidden rounded-lg bg-gray-bg">
                        <Image
                            width={400}
                            height={400}
                            className="flex size-full object-cover "
                            src={projectData.short_description_image}
                            alt={projectData?.title}
                        />
                    </div>
                ) : null}
            </div>
        </section>
    );
}
