import { Metadata } from "next";

import { ProjectsPagination } from "@/components/modules";
import { ConsultationForm } from "@/components/modules/consultation-form";
import {
    AboutJumbotron,
    AboutMap,
    AboutProjects,
} from "@/components/templates/about";
import { getAllProjectsData, getSeoViewData } from "@/queries/server";

export async function generateMetadata(): Promise<Metadata> {
    const homePageSeo = await getSeoViewData("about");

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

export default async function AboutPage({
    searchParams,
}: {
    params: { type: string };
    searchParams: {
        page: string;
        type: string;
    };
}) {
    const data = await getAllProjectsData({
        filters: {
            page: searchParams.page,
            type: searchParams.type || "housing",
            page_size: 6,
        },
    });

    return (
        <>
            <AboutJumbotron />
            <AboutMap />
            <AboutProjects projectList={data?.results} />
            <ProjectsPagination
                count={data?.count}
                prev={data?.previous}
                next={data?.next}
                pageSize={6}
            />
            <ConsultationForm />
        </>
    );
}
