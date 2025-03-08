import Image from "next/image";

import { Projects, TextBlock } from "@/types";

export function ProjectLocationGalleryItem({
    text,
    square_image,
    horizontal_image,
    title,
}: TextBlock) {
    return (
        <div className="group flex w-full flex-col gap-5 lg:gap-8">
            <h3 className="text-center font-sans text-4xl lg:text-5xl">
                {title}
            </h3>
            {horizontal_image && title ? (
                <div className="flex h-[250px] max-h-[400px]  flex-1 shrink-0 overflow-hidden rounded-lg bg-gray-bg  lg:h-[400px]">
                    <Image
                        width={1080}
                        height={400}
                        src={horizontal_image}
                        alt={title}
                        className="flex size-full shrink-0 object-cover"
                    />
                </div>
            ) : null}
            <div className="flex w-full flex-col gap-11 lg:gap-14 lg:group-odd:flex-row lg:group-even:flex-row-reverse">
                {square_image && title ? (
                    <div className="flex h-[250px] max-h-[400px] flex-1 shrink-0 overflow-hidden rounded-lg bg-gray-bg  lg:h-[400px]">
                        <Image
                            width={540}
                            height={400}
                            src={square_image}
                            alt={title}
                            className="flex size-full shrink-0 object-cover"
                        />
                    </div>
                ) : null}
                <div className="flex flex-1">
                    <p className="my-auto text-base text-black">{text}</p>
                </div>
            </div>
        </div>
    );
}
interface ProjectLocationGalleryProps {
    projectData?: Projects;
}
export function ProjectLocationGallery({
    projectData: data,
}: ProjectLocationGalleryProps) {
    return data?.text_blocks?.length ? (
        <section className="container py-[50px] lg:py-[60px]">
            <div className="flex w-full flex-col gap-16 lg:gap-11">
                <div className="flex w-full flex-col gap-[60px]">
                    {data.text_blocks.map((item) => (
                        <ProjectLocationGalleryItem key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </section>
    ) : null;
}
