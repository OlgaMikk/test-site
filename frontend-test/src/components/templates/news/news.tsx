"use client";

import { useMemo } from "react";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/api/use-site-settings";
import { NewsList, Year } from "@/types";

import { NewsCategories } from "./modules/news-categories";
import { NewsFilters } from "./modules/news-filters";
import { NewsItem } from "./modules/news-item";

interface NewsListTemplateProps {
    news?: NewsList;
    year: string;
    category: string;
    pageSize: string;
    project: string;
    years?: Year[];
}
export function NewsListTemplate({
    news,
    year,
    category,
    pageSize,
    years,
    project,
}: NewsListTemplateProps) {
    const { siteSettings } = useSiteSettings();

    const projects = siteSettings?.projects;

    const currentProject = useMemo(() => {
        return projects?.find((item) => String(item?.id) === project);
    }, [project, projects]);

    const router = useRouter();
    const pathname = usePathname();

    const onNewsParamsChange = ({
        year,
        category,
        pageSize,
        project,
    }: {
        year: string;
        category: string;
        pageSize: string;
        project: string;
    }) => {
        router.push(
            pathname +
                "?" +
                `year=${year}` +
                "&" +
                `category=${category}` +
                "&" +
                `pageSize=${pageSize}` +
                "&" +
                `project=${project}`,
            {
                scroll: false,
            },
        );
    };

    return (
        <section className="overflow-hidden py-[50px] lg:py-[60px]">
            <div className="container">
                <div className="flex w-full flex-col gap-[50px] lg:gap-[60px] ">
                    <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:gap-16">
                        <h1 className="font-sans text-[36px] leading-none lg:mb-[-10px] lg:text-[50px]">
                            Новости
                        </h1>
                        <NewsCategories
                            category={category}
                            onNewsParamsChange={(category) =>
                                onNewsParamsChange({
                                    year,
                                    category,
                                    pageSize,
                                    project,
                                })
                            }
                        />
                        <NewsFilters
                            year={year}
                            years={years}
                            onNewsParamsChange={(year, project) =>
                                onNewsParamsChange({
                                    year,
                                    category,
                                    pageSize,
                                    project,
                                })
                            }
                            projects={projects}
                            currentProject={currentProject}
                        />
                    </div>
                    {news?.results?.length ? (
                        <div className="flex w-full flex-col gap-[40px] lg:gap-[60px]">
                            <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
                                {news.results?.map((item) => (
                                    <NewsItem key={`${item.title}`} {...item} />
                                ))}
                            </div>
                            {news?.next ? (
                                <Button
                                    className="mx-auto h-[60px] w-[280px] lg:w-[340px]"
                                    onClick={() =>
                                        onNewsParamsChange({
                                            year,
                                            category,
                                            pageSize: String(+pageSize + 6),
                                            project,
                                        })
                                    }
                                >
                                    Загрузить еще
                                </Button>
                            ) : null}
                        </div>
                    ) : (
                        <div className="flex flex-1 items-center justify-center py-8">
                            <p className="text-center text-xl font-medium">
                                Новостей пока нет!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
