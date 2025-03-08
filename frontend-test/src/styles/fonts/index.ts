// import { Manrope, Open_Sans, Be } from "next/font/google";

// const open = Open_Sans({
//     subsets: ["latin", "cyrillic"],
//     display: "swap",
//     adjustFontFallback: false,
//     variable: "--font-open",
// });

// const manrope = Manrope({
//     subsets: ["latin", "cyrillic"],
//     display: "swap",
//     adjustFontFallback: false,
//     variable: "--font-manrope",
// });

// export { manrope, open };

import localFont from "@next/font/local";

const bebasNeue = localFont({
    src: [
        {
            path: "../../../public/fonts/BebasNeue.ttf",
            weight: "700",
        },
    ],
    variable: "--font-bebas-neue",
});

export { bebasNeue };
