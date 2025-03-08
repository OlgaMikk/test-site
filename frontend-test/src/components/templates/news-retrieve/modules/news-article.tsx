"use client";

import Image from "next/image";

import { NewsRetrieve } from "@/types";

interface NewsArticleProps {
    newsRetrieve?: NewsRetrieve;
}
export function NewsArticle({ newsRetrieve: data }: NewsArticleProps) {
    return data?.article_blocks.length ? (
        <div className="flex w-full flex-col gap-5 lg:gap-8">
            {data.article_blocks.map((item) => (
                <div
                    key={item.id}
                    className="flex w-full flex-col gap-5 lg:gap-8"
                >
                    <div className="flex h-[230px] w-full shrink-0 bg-gray-light md:h-[300px] lg:h-[400px]">
                        {item.image ? (
                            <Image
                                className="size-full object-contain"
                                src={item.image}
                                width={300}
                                height={300}
                                alt=""
                            />
                        ) : null}
                    </div>
                    <div
                        className="flex w-full text-base lg:text-lg"
                        dangerouslySetInnerHTML={{
                            __html: item.text,
                        }}
                    />
                </div>
            ))}
        </div>
    ) : null;
}
