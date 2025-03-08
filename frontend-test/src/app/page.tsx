import { Metadata } from "next";

import { ConsultationForm } from "@/components/modules/consultation-form";
import {
    HomeHeroTemplate,
    ProjectsTemplate,
} from "@/components/templates/home";
import { BanksBlock } from "@/components/templates/home/banks";
import {
    getAllProjectsData,
    getBanksData,
    getJumbotronData,
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

export default async function Home({
    searchParams,
}: {
    searchParams: {
        city: string;
        page: string;
    };
}) {
    const data = await getAllProjectsData({
        filters: {
            city: searchParams.city || "",
            page: searchParams.page || "1",
            type: undefined,
            page_size: 3,
        },
    });

    const banksData = await getBanksData();
    const jumbotronData = await getJumbotronData();

    return (
        <>
            <HomeHeroTemplate jumbotron={jumbotronData} />
            <ProjectsTemplate pageData={data} />
            <BanksBlock banks={banksData} />
            <ConsultationForm />
        </>
    );
}
