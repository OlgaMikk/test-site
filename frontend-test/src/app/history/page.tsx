import { Metadata } from "next";

import { HistoryHeroTemplate } from "@/components/templates/history/hero";
import { HistoriesTemplate } from "@/components/templates/history/histories";
import {
    getCompanyHistoryData,
    getCompanyHistoryYearData,
    getSeoViewData,
} from "@/queries/server";

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

export default async function HistoryPage({
    searchParams,
}: {
    searchParams: {
        year: string;
    };
}) {
    const years = await getCompanyHistoryYearData();
    const data = await getCompanyHistoryData({
        year: Number(searchParams.year) ? Number(searchParams.year) : null,
    });

    return (
        <>
            <HistoryHeroTemplate />
            <HistoriesTemplate historyData={data} years={years} />
        </>
    );
}
