import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

import { Footer, Header } from "@/components/layouts";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/queries/server";
import { bebasNeue } from "@/styles/fonts";
import { cn } from "@/utils/cn";

export const viewport: Viewport = {
    themeColor: "white",
};

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(process.env.NEXT_HOSTNAME || ""),

    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const siteSettings = await getSiteSettings();

    const settings = siteSettings ? siteSettings[0] : undefined;

    return (
        <html lang="ru">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#AD8D6C"
                />
                <meta name="msapplication-TileColor" content="#AD8D6C" />
                <meta name="theme-color" content="#ffffff" />
            </head>

            <body className={cn(bebasNeue.variable, "overflow-y-scroll")}>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer
                    inn={settings?.inn}
                    ogrn={settings?.ogrn}
                    phone={settings?.phone}
                    email={settings?.email}
                    projects={settings?.projects}
                />
            </body>
        </html>
    );
}
