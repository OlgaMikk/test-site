import { Metadata } from "next";

import { NewsRetrieveTemplate } from "@/components/templates/news-retrieve/index";
import { BASE_URL } from "@/lib/axios";
import { getNewsAuthorData, getNewsRetrieveData } from "@/queries/server";
import { newsListSchema } from "@/types/schemas";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const allNews = await fetch(`${BASE_URL}/api/news/`);

    const jsonPosts = await allNews.json();

    const news = newsListSchema.optional().parse(jsonPosts);

    if (news?.results?.length) {
        return news?.results?.map((item) => ({
            slug: String(item.slug),
        }));
    }

    return [];
}

type Props = {
    params: { slug: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const newsRetrieveData = await getNewsRetrieveData({ slug: params.slug });

    const images = [
        {
            url: newsRetrieveData?.cover_image || "",
            width: 800,
            height: 800,
            alt: newsRetrieveData?.title,
        },
    ];

    return {
        title: newsRetrieveData?.title,
        openGraph: {
            title: newsRetrieveData?.title,
            description: newsRetrieveData?.title,
            siteName: newsRetrieveData?.title,
            images: images,
            locale: "ru_RU",
            type: "website",
        },
    };
}

export default async function NewsRetrievePage({
    params,
}: {
    params: { slug: string };
}) {
    const newsRetrieveData = await getNewsRetrieveData({ slug: params.slug });
    const authorList = await getNewsAuthorData();

    return (
        <>
            <NewsRetrieveTemplate
                newsRetrieve={newsRetrieveData}
                authorList={authorList}
            />
        </>
    );
}
