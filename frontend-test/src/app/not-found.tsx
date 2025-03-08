import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export default function NotFound() {
    return (
        <div className="container flex h-full max-w-2xl flex-col items-center justify-center text-center max-lg:py-[180px]">
            <div className="z-0 flex shrink-0 max-lg:absolute max-lg:w-[320px] max-lg:opacity-20 lg:mb-[40px] lg:mt-[80px] lg:w-[70px]">
                <Image
                    priority
                    src="/logo-letter.svg"
                    className="size-full"
                    alt="Логотип"
                    width={50}
                    height={50}
                />
            </div>
            <h1 className="z-10 mb-[25px] text-center text-3xl font-medium">
                Этой страницы больше&nbsp;не&nbsp;существует
            </h1>
            <Link
                className={cn(
                    buttonVariants({
                        variant: "default",
                        size: "xl",
                    }),
                    "z-10 w-full text-[16px]",
                )}
                href="/"
            >
                Вернуться на главную страницу
            </Link>
        </div>
    );
}
