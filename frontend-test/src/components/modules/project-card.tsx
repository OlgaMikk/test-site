"use client";

import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Projects } from "@/types";

export function ProjectCard({
    title,
    image,
    short_description,
    slug,
}: Projects) {
    return (
        <Link
            href={`/project/${slug}/`}
            className="group flex h-fit w-full shrink-0 cursor-pointer flex-col gap-[20px] transition-all duration-150"
        >
            <div
                className="flex w-full items-center justify-center overflow-hidden rounded-[10px] bg-gray-bg"
                style={{ aspectRatio: "3/2" }}
            >
                {image ? (
                    <Image
                        src={image}
                        width={500}
                        height={500}
                        alt=""
                        className="flex size-full object-cover duration-500 group-hover:scale-105"
                    />
                ) : (
                    <ImageIcon className="size-[100px] text-gray-light" />
                )}
            </div>
            <div className="flex w-full flex-col gap-[5px]">
                <h3 className="text-lg font-semibold uppercase leading-tight lg:text-xl">
                    {title}
                </h3>

                <p className="text-sm leading-normal lg:text-lg">
                    {short_description}
                </p>
            </div>
            <div className="mt-auto flex flex-row items-center gap-4">
                <span>Узнать больше</span>
                <div className="flex h-[10px] w-[50px] shrink-0 transition-all duration-500 group-hover:translate-x-1">
                    <Image
                        src="/images/about/arrow.svg"
                        width={50}
                        height={10}
                        alt=""
                    />
                </div>
            </div>
        </Link>
    );
}
