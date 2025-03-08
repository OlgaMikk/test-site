"use client";

import { ComponentPropsWithoutRef, useEffect, useState } from "react";

import { ChevronDown, ChevronDownCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSiteSettings } from "@/hooks/api/use-site-settings";
import { useMediaQuery, useScrollBlocker } from "@/hooks/browser";
import { Projects } from "@/types";
import { cn } from "@/utils/cn";

import { buttonVariants } from "../ui/button";
import { Popover } from "../ui/popover";

export function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const { siteSettings } = useSiteSettings();

    useScrollBlocker(showMenu);

    const pathname = usePathname();

    const isHomePage = pathname === "/" || pathname === "/about/";

    return (
        <header className="container relative top-0 z-50 flex items-center gap-10 py-4 md:py-4 xl:gap-16">
            <Link href="/" className="z-50">
                <Image
                    className="hidden lg:flex"
                    priority
                    src="/updated-logo.svg"
                    alt="Логотип"
                    width={185}
                    height={25}
                />
                <Image
                    className="lg:hidden"
                    priority
                    src="/logo.svg"
                    alt="Логотип"
                    width={92}
                    height={60}
                />
            </Link>

            <HamburgerButton
                open={showMenu}
                onClick={() => {
                    setShowMenu((prev) => !prev);
                }}
                aria-expanded={showMenu}
            />
            <MobileMenu
                showMenu={showMenu}
                phone={siteSettings?.phone}
                projects={siteSettings?.projects}
                onClose={() => {
                    setShowMenu(false);
                }}
            />

            <NavMenu projects={siteSettings?.projects} />

            <div className="z-50 hidden grow items-center gap-x-3 lg:flex">
                <a
                    href={`tel:${siteSettings?.phone}`}
                    className={cn(
                        "w-full text-right font-medium transition hover:text-primary-hover",
                        isHomePage ? "text-black" : "text-foreground",
                    )}
                >
                    {siteSettings?.phone}
                </a>
                <div className="pointer-events-none text-primary">/</div>
                <Popover>
                    <Popover.Trigger
                        className={cn(
                            buttonVariants({ variant: "default", size: "sm" }),
                            "w-fit rounded",
                        )}
                    >
                        Личный кабинет
                    </Popover.Trigger>

                    <Popover.Content
                        align="end"
                        className="w-fit rounded p-4 text-center text-xs font-semibold"
                    >
                        Личный кабинет находится <br /> в разработке
                    </Popover.Content>
                </Popover>
            </div>
        </header>
    );
}

export const aboutOptions = [
    {
        id: 1,
        slug: "/history/",
        title: "История компании",
    },
    {
        id: 2,
        slug: "/team/",
        title: "Команда",
    },
    {
        id: 3,
        slug: "/about/",
        title: "Портфолио",
    },
    {
        id: 4,
        slug: "/partners/",
        title: "Партнеры",
    },
    {
        id: 5,
        slug: "/career/",
        title: "Карьера",
    },
];

export const newsOptions = [
    {
        id: 1,
        href: "/news/?category=analytics",
        title: "Аналитика",
    },
    {
        id: 2,
        href: "/news/?category=blog",
        title: "Блог",
    },
];

function NavMenu({
    projects,
    ...props
}: ComponentPropsWithoutRef<"div"> & { projects?: Projects[] }) {
    const [showPopover, setShowPopover] = useState(false);
    const [showAboutPopover, setShowAboutPopover] = useState(false);
    const [showNewsPopover, setShowNewsPopover] = useState(false);

    return (
        <div className="hidden items-center gap-6 lg:flex" {...props}>
            <Popover
                open={showAboutPopover}
                onOpenChange={() => {
                    setShowAboutPopover((prev) => !prev);
                }}
            >
                <Popover.Trigger
                    className={cn(
                        "group flex gap-2 font-medium hover:text-primary-hover",
                    )}
                >
                    <span>О холдинге</span>
                    <ChevronDown className="transition group-data-[state=open]:rotate-180 [&>path]:stroke-black group-hover:[&>path]:stroke-primary" />
                </Popover.Trigger>

                <Popover.Content
                    align="start"
                    className="flex w-fit flex-col gap-3 px-5"
                >
                    {aboutOptions.map((el) => (
                        <Link
                            key={el.id}
                            onClick={() => {
                                setShowPopover(false);
                            }}
                            href={el.slug}
                            className="transition hover:text-primary"
                        >
                            {el.title}
                        </Link>
                    ))}
                </Popover.Content>
            </Popover>

            <Popover
                open={showPopover}
                onOpenChange={() => {
                    setShowPopover((prev) => !prev);
                }}
            >
                <Popover.Trigger
                    className={cn(
                        "group flex gap-2 font-medium hover:text-primary-hover",
                    )}
                >
                    <span>Наши проекты</span>
                    <ChevronDown className="transition group-data-[state=open]:rotate-180 [&>path]:stroke-black group-hover:[&>path]:stroke-primary" />
                </Popover.Trigger>

                <Popover.Content
                    align="start"
                    className="flex w-fit flex-col gap-3 px-5"
                >
                    {projects?.map((el) => (
                        <Link
                            key={el.id}
                            onClick={() => {
                                setShowPopover(false);
                            }}
                            href={`/project/${el.slug}/`}
                            className="transition hover:text-primary"
                        >
                            {el.title}
                        </Link>
                    ))}
                </Popover.Content>
            </Popover>
            <Popover
                open={showNewsPopover}
                onOpenChange={() => {
                    setShowNewsPopover((prev) => !prev);
                }}
            >
                <Popover.Trigger
                    className={cn(
                        "group flex gap-2 font-medium hover:text-primary-hover",
                    )}
                >
                    <span>Новости</span>
                    <ChevronDown className="transition group-data-[state=open]:rotate-180 [&>path]:stroke-black group-hover:[&>path]:stroke-primary" />
                </Popover.Trigger>

                <Popover.Content
                    align="start"
                    className="flex w-fit flex-col gap-3 px-5"
                >
                    {newsOptions?.map((el) => (
                        <Link
                            key={el.id}
                            onClick={() => {
                                setShowPopover(false);
                            }}
                            href={el.href}
                            className="transition hover:text-primary"
                        >
                            {el.title}
                        </Link>
                    ))}
                </Popover.Content>
            </Popover>
        </div>
    );
}

function HamburgerButton(
    props: ComponentPropsWithoutRef<"button"> & { open: boolean },
) {
    return (
        <button
            type="button"
            className={cn(
                "z-50 my-auto ml-auto size-10 justify-center self-end aria-expanded:opacity-80 lg:hidden [&>*]:block [&>*]:h-[3px] [&>*]:rounded-sm [&>*]:transition-all",
                props.open ? "[&>*]:bg-primary" : "[&>*]:bg-black",
            )}
            {...props}
        >
            <span className={cn("w-8 origin-top-left")} />
            <span
                className={cn("mt-2 h-[3px] w-8", props.open ? "w-5" : "w-8")}
            />
            <span className={cn("mt-2 h-[3px] w-8 origin-bottom-left")} />
        </button>
    );
}

function MobileMenu({
    showMenu,
    onClose,
    projects,
    phone,
}: {
    showMenu: boolean;
    onClose: () => void;
    projects?: Projects[];
    phone?: string;
}) {
    const [showPopover, setShowPopover] = useState(false);
    const [showAboutPopover, setShowAboutPopover] = useState(false);

    const lg = useMediaQuery("(min-width: 1024px)");

    useEffect(() => {
        if (lg) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lg]);

    return (
        <div
            className={cn(
                "fixed inset-0 z-40 flex size-full flex-col bg-white px-4 py-20 text-2xl font-semibold transition-all",
                showMenu ? "translate-x-0" : "-translate-x-full",
            )}
        >
            <div className="flex h-full flex-col justify-center gap-y-4 text-[18px] font-medium">
                <Popover
                    open={showAboutPopover}
                    onOpenChange={() => {
                        setShowAboutPopover((prev) => !prev);
                    }}
                >
                    <Popover.Trigger
                        className={cn(
                            "flex items-center gap-x-2 uppercase transition-colors hover:text-primary active:text-primary",
                        )}
                    >
                        <span>О холдинге</span>
                        <ChevronDownCircleIcon className="fill-primary stroke-primary [&>path]:stroke-white" />
                    </Popover.Trigger>

                    <Popover.Content
                        align="start"
                        className="flex w-fit flex-col gap-3 px-5"
                    >
                        {aboutOptions?.map((el) => (
                            <Link
                                key={el.id}
                                onClick={() => {
                                    onClose();
                                    setShowAboutPopover(false);
                                }}
                                href={`${el.slug}`}
                                className="transition hover:text-primary"
                            >
                                {el.title}
                            </Link>
                        ))}
                    </Popover.Content>
                </Popover>
                <Popover
                    open={showPopover}
                    onOpenChange={() => {
                        setShowPopover((prev) => !prev);
                    }}
                >
                    <Popover.Trigger
                        className={cn(
                            "flex items-center gap-x-2 uppercase transition-colors hover:text-primary active:text-primary",
                        )}
                    >
                        <span>Наши проекты</span>
                        <ChevronDownCircleIcon className="fill-primary stroke-primary [&>path]:stroke-white" />
                    </Popover.Trigger>

                    <Popover.Content
                        align="start"
                        className="flex w-fit flex-col gap-3 px-5"
                    >
                        {projects?.map((el) => (
                            <Link
                                key={el.id}
                                onClick={() => {
                                    onClose();
                                    setShowPopover(false);
                                }}
                                href={`/project/${el.slug}/`}
                                className="transition hover:text-primary"
                            >
                                {el.title}
                            </Link>
                        ))}
                    </Popover.Content>
                </Popover>
            </div>

            <div className="mx-auto flex h-fit w-full flex-col gap-y-4 self-end text-left text-foreground">
                <a className="text-[20px]" href={`tel:${phone}`}>
                    {phone}
                </a>
                <Popover>
                    <Popover.Trigger
                        className={cn(
                            buttonVariants({
                                variant: "default",
                            }),
                            "h-16 w-full rounded",
                        )}
                    >
                        Личный кабинет
                    </Popover.Trigger>

                    <Popover.Content className="w-fit rounded p-4 text-center text-xs font-semibold">
                        Личный кабинет находится <br /> в разработке
                    </Popover.Content>
                </Popover>
            </div>
        </div>
    );
}
