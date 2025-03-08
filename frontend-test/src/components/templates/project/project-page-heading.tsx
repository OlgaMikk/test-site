"use client";

import { useState } from "react";

import Image from "next/image";

import { Projects } from "@/types";

import { VideoDialog } from "./dialogs/video-dialog";

interface ProjectPageHeadingProps {
    projectData?: Projects;
}
export function ProjectPageHeading({
    projectData: data,
}: ProjectPageHeadingProps) {
    const [showVideoDialog, setShowVideoDialog] = useState(false);

    return (
        <section className="container max-w-[1980px] px-0">
            <div className="relative mb-8 flex w-full flex-col items-center justify-center gap-[80px] overflow-hidden px-4 py-[90px] lg:h-[500px] xl:mb-20 xl:mt-0">
                {data?.image && data?.title ? (
                    <Image
                        fill
                        sizes="(min-width: 320px) 100vw"
                        className="object-cover"
                        src={data?.image}
                        alt={data?.title}
                    />
                ) : (
                    <div className="absolute size-full animate-pulse bg-gray" />
                )}

                <div className="z-10 flex w-full max-w-[500px] flex-1 flex-col items-center gap-8 text-white max-lg:px-4">
                    {data?.logo ? (
                        <div className="flex flex-1 items-center justify-center">
                            <Image
                                width={800}
                                height={800}
                                className="size-full object-contain"
                                src={data?.logo}
                                alt=""
                            />
                        </div>
                    ) : null}
                    <div className="text-center text-lg">{data?.address}</div>
                </div>

                {data?.image && data?.title ? (
                    <div className="absolute inset-0 size-full bg-gradient-to-t from-black/60  to-black/20" />
                ) : undefined}

                {data?.video_url ? (
                    <>
                        <div className="z-10 flex flex-col items-center gap-3.5 text-white lg:absolute lg:bottom-16 lg:right-16">
                            <span className="text-base">Смотреть видео</span>
                            <button
                                className="flex size-20 shrink-0 items-center justify-center rounded-full"
                                onClick={() => setShowVideoDialog(true)}
                            >
                                <Image
                                    src="/images/misc/play.svg"
                                    alt=""
                                    width={80}
                                    height={80}
                                />
                            </button>
                        </div>
                        <VideoDialog
                            video_url={data?.video_url}
                            open={showVideoDialog}
                            onClose={() => setShowVideoDialog(false)}
                        />
                    </>
                ) : null}
            </div>
        </section>
    );
}
