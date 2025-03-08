"use client";

import { useState } from "react";

import Image from "next/image";

import { ProjectImages } from "@/types";

import { Carousel } from "../ui/carousel";
import { ProjectGalleryDialog } from "./project-gallery-dialog";

interface ProjectGalleryProps {
    images?: ProjectImages[];
}
export function ProjectGallery({ images }: ProjectGalleryProps) {
    const [showProjectGalleryDialog, setShowProjectGalleryDialog] =
        useState(false);

    return images?.length ? (
        <>
            <Carousel className="relative flex w-full flex-col">
                <Carousel.Content>
                    {images?.map((image) => (
                        <Carousel.Item
                            key={image.id}
                            className="relative h-64 lg:h-80 xl:h-[404px]"
                            onClick={() => setShowProjectGalleryDialog(true)}
                        >
                            <Image
                                alt=""
                                src={image.image}
                                fill
                                className="object-cover"
                                priority
                            />
                        </Carousel.Item>
                    ))}
                </Carousel.Content>
                <Carousel.Previous className="absolute left-2 top-1/2 -translate-y-1/2" />
                <Carousel.Next className="absolute right-2 top-1/2 -translate-y-1/2" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <Carousel.DotsNav />
                </div>
            </Carousel>
            <ProjectGalleryDialog
                open={showProjectGalleryDialog}
                onClose={() => setShowProjectGalleryDialog(false)}
                images={images}
            />
        </>
    ) : null;
}
