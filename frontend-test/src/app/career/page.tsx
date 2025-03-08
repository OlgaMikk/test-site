import { Metadata } from "next";

import { VacancyForm } from "@/components/modules/vacancy-form";
import { CareerAdvantagesTemplate } from "@/components/templates/career/advantages";
import { CareerHeroTemplate } from "@/components/templates/career/hero";
import { CareerVacanciesTemplate } from "@/components/templates/career/vacancies";
import { getCareerData, getSeoViewData } from "@/queries/server";

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

export default async function TeamPage() {
    const data = await getCareerData();
    return (
        <>
            <CareerHeroTemplate />
            <CareerAdvantagesTemplate />
            <CareerVacanciesTemplate vacancies={data} />
            <VacancyForm />
            {/* <SocialNetworksTemplate /> */}
        </>
    );
}
