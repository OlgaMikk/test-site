export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Группа компаний «ЛЕННАР»",
    description:
        "Наше предназначение — быть созидателями, создавать пространство для ведения бизнеса, комфортной жизни и отдыха",
    mainNav: [
        {
            title: "О нас",
            href: "/about",
        },
        {
            title: "Наши проекты",
            href: "/objects",
        },
    ],
    links: {
        facebook: "",
    },
    phone: {
        visible: "8 (800) 222-56-83",
        href: "88002225683",
    },
    email: "office@lennar.ru",
    inn: "9706040146",
    ogrn: "1237700897895",
};
