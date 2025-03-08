"use client";

import { useEffect } from "react";

import {
    BuildingCorpus,
    ProjectGallery as Gallery,
} from "@/components/modules";
import { buttonVariants } from "@/components/ui/button";
import { Projects } from "@/types";
import { cn } from "@/utils/cn";
import { getProfitBaseWidget } from "@/utils/get-profitbase-widget";

interface ProjectGalleryProps {
    projectData?: Projects;
}
export function ProjectGallery({ projectData: data }: ProjectGalleryProps) {
    useEffect(() => {
        getProfitBaseWidget(window.document, data?.catalog_btn_link);
    }, [data?.catalog_btn_link]);

    return (
        <section className="container flex flex-col gap-y-8 py-[50px] lg:py-[60px]">
            <div className="grid w-full grid-cols-1 gap-5 lg:w-fit lg:grid-cols-2 lg:gap-x-12">
                {data?.estate_objects?.map((est) => (
                    <BuildingCorpus key={est.id} {...est} />
                ))}
            </div>
            <div className="mb-6 max-w-3xl text-base max-lg:order-2 lg:text-xl">
                {data?.housing_description}
            </div>

            <Gallery images={data?.images} />

            {data?.catalog_btn_link ? (
                <a
                    className={cn(
                        buttonVariants({ variant: "default" }),
                        "mx-auto w-fit",
                    )}
                    href={data.catalog_btn_link}
                >
                    Выбрать подходящий вариант
                </a>
            ) : null}
            {/* TODO add button */}
            {/* <Button
                variant="default"
                className="mx-auto w-fit"
                onClick={() => window.dvizhWidget?.run("calculator")}
            >
                Подобрать ипотеку
            </Button> */}
        </section>
    );
}
