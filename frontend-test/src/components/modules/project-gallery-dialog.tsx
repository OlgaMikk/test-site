"use client";

import Image from "next/image";

import { Carousel } from "@/components/ui/carousel";
import { Dialog } from "@/components/ui/dialog";
import { ProjectImages } from "@/types";

export function ProjectGalleryDialog({
    open,
    onClose,
    images,
}: {
    open: boolean;
    onClose: () => void;
    images?: ProjectImages[];
}) {
    return (
        <Dialog key="project-gallery-dialog" open={open} onOpenChange={onClose}>
            <Dialog.Content
                className="flex min-h-[80%] min-w-[80%] shrink-0 flex-col bg-black p-0"
                closeButtonOutside
            >
                <div className="grid size-full flex-1 shrink-0 overflow-hidden rounded-lg">
                    <Carousel className="relative flex size-full flex-col  [&>div]:h-full">
                        <Carousel.Content className="h-full">
                            {images?.map((image) => (
                                <Carousel.Item
                                    key={image.id}
                                    className="relative h-full"
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
                        <div className="absolute bottom-2 left-1/2 !h-fit -translate-x-1/2">
                            <Carousel.DotsNav />
                        </div>
                    </Carousel>
                </div>
            </Dialog.Content>
        </Dialog>
    );
}
