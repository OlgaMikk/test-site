"use client";

import Image from "next/image";
import Link from "next/link";

const socialNetworks = [
    {
        title: "YouTube",
        link: "",
        image: "/images/footer/yt.svg",
    },
    {
        title: "Дзен",
        link: "",
        image: "/images/footer/ya.svg",
    },
    {
        title: "Вконтакте",
        link: "",
        image: "/images/footer/vk.svg",
    },
    {
        title: "Whats'App",
        link: "",
        image: "/images/footer/wa.svg",
    },
    {
        title: "Telegram",
        link: "",
        image: "/images/footer/tg.svg",
    },
];
interface SocialNetworkProps {
    title: string;
    link: string;
    image: string;
}
export function SocialNetwork({ title, link, image }: SocialNetworkProps) {
    return (
        <Link
            className="flex size-[90px] shrink-0 flex-col items-center justify-center  gap-1 overflow-hidden rounded-full bg-white transition hover:opacity-60"
            href={link}
        >
            <Image
                src={image}
                alt={title}
                width={40}
                height={40}
                className="size-[36px] object-contain"
            />
            <span className="text-sm font-medium text-primary">{title}</span>
        </Link>
    );
}
export function SocialNetworksTemplate() {
    return (
        <section className="py-[50px] lg:py-[60px]">
            <div className="container">
                <div className="flex w-full flex-col items-center justify-between gap-6 rounded bg-gray-bg px-4 py-6 md:px-10 md:py-6 lg:flex-row">
                    <p className="flex w-full max-w-[460px] text-[22px] font-semibold leading-tight sm:text-center lg:text-left lg:text-[24px] lg:font-bold">
                        Подписывайтесь на нас в социальных сетях и следите за
                        новостями
                    </p>
                    <div className="flex flex-row gap-3 max-md:flex-wrap">
                        {socialNetworks.map((network) => (
                            <SocialNetwork key={network.title} {...network} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
