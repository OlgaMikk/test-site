import { Metadata } from "next";

import { ConsultationForm } from "@/components/modules/consultation-form";
import {
    ProjectInfo,
    ProjectLocationAdvantage,
    ProjectLocationGallery,
    ProjectLocationInfo,
    ProjectPageHeading,
} from "@/components/templates/project";
import { ProjectBuildingProgresses } from "@/components/templates/project/project-building-progresses";
import { ProjectGallery } from "@/components/templates/project/project-gallery";
import { ProjectLocationMap } from "@/components/templates/project/project-map";
import { BASE_URL } from "@/lib/axios";
import { getProjectData } from "@/queries/server";
import { pageResultSchema } from "@/types/schemas";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const allPosts = await fetch(`${BASE_URL}/api/project/?page_size=${25}`);

    const jsonPosts = await allPosts.json();

    const posts = pageResultSchema.parse(jsonPosts);

    if (posts?.results?.length) {
        return posts?.results?.map((post) => ({
            slug: String(post.slug),
        }));
    }

    return [];
}

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const projectData = await getProjectData({ slug: params.slug });

    const images = [
        {
            url: projectData?.image || "",
            width: 800,
            height: 800,
            alt: projectData?.title,
        },
    ];

    return {
        title: projectData?.title,
        openGraph: {
            title: projectData?.title,
            description: projectData?.short_description,
            siteName: projectData?.title,
            images: images,
            locale: "ru_RU",
            type: "website",
        },
    };
}

export default async function ProjectPage({
    params,
}: {
    params: { slug: string };
}) {
    const projectData = await getProjectData({ slug: params.slug });

    return (
        <>
            <ProjectPageHeading projectData={projectData} />
            <ProjectInfo projectData={projectData} />
            <ProjectGallery projectData={projectData} />
            <ProjectLocationInfo projectData={projectData} />
            <ProjectLocationMap projectData={projectData} />
            <ProjectLocationAdvantage projectData={projectData} />
            <ProjectLocationGallery projectData={projectData} />
            <ProjectBuildingProgresses projectData={projectData} />
            <ConsultationForm />
        </>
    );
}
