"use client";

import Image from "next/image";
import Link from "next/link";

import { News } from "@/types";

export function NewsItem({ title, cover_image, publication_date, slug }: News) {
    return (
        <Link
            className="group flex w-full flex-col gap-3.5"
            href={`/news/${slug}/`}
        >
            <div className="flex h-[220px] w-full shrink-0 overflow-hidden rounded md:h-[280px] lg:h-[380px]">
                {cover_image ? (
                    <Image
                        loading="lazy"
                        src={cover_image}
                        alt={title}
                        width={360}
                        height={380}
                        className="size-full bg-gray-light object-cover transition group-hover:scale-105"
                    />
                ) : (
                    <div className="size-full animate-pulse bg-gray-light" />
                )}
            </div>
            <div className="flex w-full flex-col gap-2">
                {title ? (
                    <h2 className="break-words tracking-tight lg:text-lg">
                        {title}
                    </h2>
                ) : null}
                {publication_date ? (
                    <p className="break-words text-sm text-gray lg:text-base ">
                        {new Date(publication_date).toLocaleDateString(
                            "ru-RU",
                            { day: "2-digit", month: "long", year: "numeric" },
                        )}
                    </p>
                ) : null}
            </div>
        </Link>
    );
}
