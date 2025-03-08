"use client";

import Image from "next/image";

export default function Error() {
    return (
        <div className="container flex h-full max-w-2xl flex-col items-center justify-center text-center max-lg:py-[180px]">
            <div className="flex shrink-0 max-lg:absolute max-lg:w-[320px] max-lg:opacity-20 lg:mb-[40px] lg:mt-[80px] lg:w-[70px]">
                <Image
                    priority
                    src="/logo-letter.svg"
                    className="size-full"
                    alt="Логотип"
                    width={50}
                    height={50}
                />
            </div>
            <h1 className="mb-[25px] text-center text-3xl font-medium">
                Ошибка приложения
            </h1>
            <p className="text-center text-[18px] leading-tight">
                Мы уже работаем над проблемой. <br /> Пожалуйста, зайдите на
                сайт позже
            </p>
        </div>
    );
}
