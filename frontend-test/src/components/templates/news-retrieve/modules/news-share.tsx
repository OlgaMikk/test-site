"use client";

import { useEffect, useState } from "react";

import { Share2 } from "lucide-react";
import Image from "next/image";
import {
    TelegramShareButton,
    VKShareButton,
    WhatsappShareButton,
} from "react-share";

import { Popover } from "@/components/ui/popover";
import { NewsRetrieve } from "@/types";

interface NewsShareProps {
    newsRetrieve?: NewsRetrieve;
}
export function NewsShare({ newsRetrieve: data }: NewsShareProps) {
    const [href, setHref] = useState<string>("");
    useEffect(() => {
        setHref(window.location.href);
    }, []);

    return (
        <div className="flex flex-col items-end gap-2 ">
            <span className="text-lg text-gray-dark">Поделиться:</span>
            <div className="flex flex-row gap-3.5">
                <Popover>
                    <Popover.Trigger asChild>
                        <button
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    window.location.href,
                                )
                            }
                        >
                            <Share2 className="flex size-[28px] shrink-0 fill-primary text-primary" />
                        </button>
                    </Popover.Trigger>

                    <Popover.Content
                        align="center"
                        className="w-fit rounded p-4 text-center text-xs font-semibold"
                    >
                        Ссылка скопирована!
                    </Popover.Content>
                </Popover>

                <TelegramShareButton title={data?.title} url={href}>
                    <Image
                        className="flex size-8 shrink-0 "
                        src="/images/footer/tg.svg"
                        alt=""
                        width={28}
                        height={28}
                    />
                </TelegramShareButton>
                <WhatsappShareButton title={data?.title} url={href}>
                    <Image
                        className="flex size-8 shrink-0"
                        src="/images/footer/wa.svg"
                        alt=""
                        width={28}
                        height={28}
                    />
                </WhatsappShareButton>
                <VKShareButton title={data?.title} url={href}>
                    <Image
                        className="flex size-8 shrink-0 "
                        src="/images/footer/vk.svg"
                        alt=""
                        width={28}
                        height={28}
                    />
                </VKShareButton>
            </div>
        </div>
    );
}
