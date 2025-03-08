import Image from "next/image";
import Link from "next/link";

import { Bank } from "@/types";

export function BanksBlock({ banks }: { banks?: Bank[] }) {
    return (
        <section className="py-[60px] lg:py-[80px]">
            <div className="container max-md:px-2">
                <div className="flex w-full flex-col items-center gap-14 rounded-lg bg-gray-bg px-5 py-8 lg:flex-row lg:gap-3 lg:px-[50px] xl:mx-[-50px] xl:w-[calc(100%+100px)]">
                    <div className="flex w-full flex-col gap-5 lg:w-1/2">
                        <h3 className="text-[28px] font-bold uppercase leading-tight lg:text-[32px]">
                            Выгодные условия <br /> ипотечного кредитования
                        </h3>
                        <ul className="max-w-[460px] list-disc pl-5 text-base leading-tight lg:text-lg">
                            <li>Сниженные ставки</li>
                            <li>
                                Программа скидок по ипотеке от застройщиков при
                                строительстве с эскроу и проектным
                                финансированием банка
                            </li>
                        </ul>
                    </div>
                    <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-4 gap-y-5 lg:w-1/2">
                        {banks?.map((bank) => (
                            <Link
                                key={bank.id}
                                href={bank.url}
                                className="flex size-[80px] shrink-0 items-center justify-center rounded-full bg-primary p-5 transition-transform hover:scale-105"
                            >
                                <Image
                                    src={bank.icon}
                                    alt={bank.title}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
