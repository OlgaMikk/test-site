import { Metadata } from "next";

import { NewsListTemplate } from "@/components/templates/news/news";
import { getNewsData, getNewsYearData, getSeoViewData } from "@/queries/server";

export async function generateMetadata(): Promise<Metadata> {
    const homePageSeo = await getSeoViewData("index");

    const data = homePageSeo?.results ? homePageSeo?.results[0] : undefined;

    return {
        title: data?.title,
        openGraph: {
            title: data?.og_title,
            description: data?.og_description,
            siteName: data?.og_title,
            url: data?.canonical,
            images: [
                {
                    href: data?.image,
                    alt: data?.alt,
                    url: data?.image || "",
                    height: data?.height,
                    width: data?.width,
                },
            ],
            locale: "ru_RU",
            type: "website",
        },
    };
}
export default async function NewsPage({
    searchParams,
}: {
    searchParams: {
        year: string;
        category: string;
        page: string;
        pageSize: string;
        project: string;
    };
}) {
    const {
        year = "",
        category = "",
        pageSize = "6",
        project = "",
    } = searchParams;

    const years = await getNewsYearData();
    const news = await getNewsData({ year, category, pageSize, project });

    return (
        <>
            <NewsListTemplate
                news={news}
                year={year}
                project={project}
                category={category}
                pageSize={pageSize}
                years={years}
            />
        </>
    );
}
