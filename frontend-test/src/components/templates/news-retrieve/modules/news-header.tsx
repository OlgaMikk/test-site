"use client";

import Image from "next/image";

import { Author, NewsRetrieve } from "@/types";

interface NewsHeaderProps {
    newsRetrieve?: NewsRetrieve;
    author?: Author;
}
export function NewsHeader({ newsRetrieve: data, author }: NewsHeaderProps) {
    return (
        <div className="flex w-full flex-col gap-5">
            {data?.title ? (
                <h1 className="text-[20px] font-semibold leading-tight lg:text-[28px] lg:font-bold">
                    {data?.title}
                </h1>
            ) : null}
            <div className="flex w-full flex-col justify-between md:flex-row md:items-end">
                {author ? (
                    <div className="flex flex-row items-center gap-3">
                        <div className="flex size-[50px] shrink-0 overflow-hidden rounded-full bg-gray-light">
                            <Image
                                src={author.avatar}
                                width={50}
                                height={50}
                                alt={author.full_name}
                                className="size-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-base !leading-tight lg:text-lg">
                                {author.full_name}
                            </p>
                            <span className="text-base !leading-tight text-gray lg:text-lg">
                                {author.position}
                            </span>
                        </div>
                    </div>
                ) : null}
                {data?.publication_date ? (
                    <span className="text-sm text-gray max-md:ml-[62px] lg:text-lg">
                        {new Date(data?.publication_date).toLocaleDateString(
                            "ru-RU",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            },
                        )}
                    </span>
                ) : null}
            </div>
        </div>
    );
}
