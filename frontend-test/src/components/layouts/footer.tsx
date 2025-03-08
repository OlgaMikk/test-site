"use client";

import { ComponentPropsWithoutRef, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";

import { useLocalStorage } from "@/hooks/browser/use-local-storage";
import { Projects } from "@/types";
import { cn } from "@/utils/cn";
import { getProfitBaseWidget } from "@/utils/get-profitbase-widget";

import { ConsultationDialog } from "../modules/consultation-dialog";
import { aboutOptions, newsOptions } from "./header";

declare global {
    interface Window {
        dvizhWidget?: {
            run: (name: string) => void;
        };
        profitbaseWidget?: {
            widgetButtonOptions: {
                link: string;
            };
        };
    }
}

interface FooterProps {
    inn?: string;
    ogrn?: string;
    phone?: string;
    email?: string;
    projects?: Projects[];
}

export function Footer({ inn, ogrn, phone, email, projects }: FooterProps) {
    return (
        <footer className="relative">
            <div className="container mt-10 flex flex-col flex-wrap justify-between gap-[100px] py-20 lg:gap-[80px] xl:mt-20">
                <div className="flex flex-col justify-between gap-[25px] lg:flex-row lg:gap-[80px]">
                    <Link href="/">
                        <Image
                            priority
                            src="/logo.svg"
                            alt="Логотип"
                            width={142}
                            height={90}
                        />
                    </Link>
                    <div className="flex w-full flex-col justify-between max-lg:flex-col-reverse max-lg:gap-[50px] lg:flex-row">
                        <CompanyProjects projects={projects} className="" />
                        <CompanyContacts
                            phone={phone}
                            email={email}
                            className="flex flex-col gap-2 max-sm:mb-10"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-end">
                    <div className="flex flex-col gap-8">
                        <CompanyRequisites
                            inn={inn}
                            ogrn={ogrn}
                            className="flex flex-col gap-4"
                        />
                        <CompanyNotification className="hidden md:flex" />
                    </div>
                    <CompanyDocuments />
                    <CompanyNotification className="hidden max-md:flex max-md:max-w-[230px]" />
                </div>
            </div>
        </footer>
    );
}

function CompanyRequisites({
    className,
    inn,
    ogrn,
    ...rest
}: ComponentPropsWithoutRef<"div"> & { inn?: string; ogrn?: string }) {
    return (
        <div className={cn("flex-col", className)} {...rest}>
            <div className="text-xl font-bold lg:mb-6 lg:mt-2 lg:text-left">
                ООО «УК ЛЕННАР»
            </div>
            <div className="flex flex-col gap-2.5">
                <div className="text-sm font-medium tracking-tighter lg:text-left lg:text-base">
                    ИНН {inn}
                </div>
                <div className="text-sm font-medium tracking-tighter lg:text-left lg:text-base">
                    ОГРН {ogrn}
                </div>
            </div>
        </div>
    );
}

function CompanyNotification({ className }: ComponentPropsWithoutRef<"div">) {
    return (
        <p
            className={cn(
                "mb-[3px] max-w-[700px] text-sm text-gray-dark",
                className,
            )}
        >
            Сайт носит исключительно информационный характер
            и&nbsp;ни&nbsp;при&nbsp;каких условиях не&nbsp;является публичной
            офертой, определяемой положениями ст.&nbsp;437 Гражданского кодекса
            Российской Федерации
        </p>
    );
}

function CompanyProjects({
    className,
    projects,
    ...rest
}: ComponentPropsWithoutRef<"div"> & { projects?: Projects[] }) {
    return (
        <div
            className={cn(
                "grid grid-cols-2 gap-6 gap-y-[50px] lg:grid-cols-3 lg:gap-10",
                className,
            )}
            {...rest}
        >
            <div className="flex max-w-[150px] flex-col gap-2.5">
                <span> О холдинге</span>
                {aboutOptions.map((el) => (
                    <Link
                        key={el.id}
                        href={el.slug}
                        className="tracking-tighter"
                    >
                        {el.title}
                    </Link>
                ))}
            </div>
            <div className="flex max-w-[150px] flex-col gap-2.5">
                <span>Наши проекты</span>
                {projects?.map((el) => (
                    <div key={el.id} className="flex items-center gap-x-2.5">
                        <Link
                            href={`/project/${el.slug}/`}
                            className="overflow-hidden break-words tracking-tighter"
                        >
                            {el.title}
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex max-w-[150px] flex-col gap-2.5">
                <span>Новости</span>
                {newsOptions?.map((el) => (
                    <div key={el.id} className="flex items-center gap-x-2.5">
                        <Link
                            href={el.href}
                            className="overflow-hidden break-words tracking-tighter"
                        >
                            {el.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CompanyContacts({
    className,
    phone,
    email,
    ...rest
}: ComponentPropsWithoutRef<"div"> & { phone?: string; email?: string }) {
    const [loadedWidget, setLoadedWidget] = useState(false);
    const [showConsultationDialog, setShowConsultationDialog] = useState(false);

    const [consultation, setConsultation] = useLocalStorage("consultation", "");

    const pathname = usePathname();
    const pbLink = "#/catalog/projects/houses";

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!consultation) {
                setShowConsultationDialog(true);
                setConsultation("true");
            }
        }, 60000 * 3);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [consultation]);

    useEffect(() => {
        if (
            !pathname.includes("/project/") &&
            window?.profitbaseWidget?.widgetButtonOptions?.link !== pbLink
        ) {
            getProfitBaseWidget(window.document, pbLink);
        }
    }, [pathname]);

    return (
        <div
            className={cn(
                "flex-col gap-2.5 sm:text-left lg:text-right",
                className,
            )}
            {...rest}
        >
            <a href={`tel:${phone}`} className="text-xl font-bold lg:text-2xl">
                {phone}
            </a>
            <a
                href={`mailto:${email}`}
                className="text-xl font-bold lg:text-2xl"
            >
                {email}
            </a>
            {/* TODO add social links */}
            {/* <div className="mt-4 flex flex-row gap-3 lg:justify-end">
                <Link href="/" className="flex size-[28px] shrink-0">
                    <Image
                        priority
                        src="/images/footer/yt.svg"
                        alt=""
                        width={28}
                        height={28}
                    />
                </Link>
                <Link href="/" className="flex size-[28px] shrink-0">
                    <Image
                        priority
                        src="/images/footer/ya.svg"
                        alt=""
                        width={28}
                        height={28}
                    />
                </Link>
                <Link href="/" className="flex size-[28px] shrink-0">
                    <Image
                        priority
                        src="/images/footer/vk.svg"
                        alt=""
                        width={28}
                        height={28}
                    />
                </Link>
                <Link href="/" className="flex size-[28px] shrink-0">
                    <Image
                        priority
                        src="/images/footer/wa.svg"
                        alt=""
                        width={28}
                        height={28}
                    />
                </Link>
                <Link href="/" className="flex size-[28px] shrink-0">
                    <Image
                        priority
                        src="/images/footer/tg.svg"
                        alt=""
                        width={28}
                        height={28}
                    />
                </Link>
            </div> */}
            <ConsultationDialog
                open={showConsultationDialog}
                onClose={() => setShowConsultationDialog(false)}
            />
            <Script
                src="https://lennar.lk.dvizh.io/lib.js"
                type="text/javascript"
                onLoad={() => {
                    setLoadedWidget(true);
                }}
            />

            {loadedWidget ? (
                <Script
                    async={false}
                    id="dvizh-widget"
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `      
                                var dvizhWidget = new Dvizh.Widget(
                                    {
                                        tld: 'lennar',
                                        module: 'calculator',
                                        id: 'd8bb97ae-3034-4e50-a25d-e94c1640ce35',
                                        housingComplexes: ['2e7fd83a-a236-45eb-844a-31711c7bfc56'],
                                        portalStyleUuid: '2c6ababb-2165-49fa-8aaf-9711a807ce6c',
                                        autorun: false,
                                        moduleConfig: [{name: 'calculator'}]
                                    }
                                );   
                            `,
                    }}
                />
            ) : null}
        </div>
    );
}

function CompanyDocuments() {
    return (
        <div className="flex flex-col gap-2.5 text-sm lg:items-end [&>*]:w-fit [&>*]:tracking-tighter [&>*]:lg:text-base">
            <Link href={"/files/privacy-policy.pdf"} className="text-nowrap">
                Политика конфиденциальности
            </Link>
            <Link href={"/files/personal-data.pdf"} className="text-nowrap">
                Согласие на обработку персональных данных
            </Link>
        </div>
    );
}
