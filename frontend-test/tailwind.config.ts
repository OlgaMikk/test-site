import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-bebas-neue)"],
                mono: ["Onest"],
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                },
                screens: { lg: "1080px", xl: "1112px" },
            },

            keyframes: {
                floating: {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "50%": { transform: "translate(0, 15px)" },
                },
                wiggle: {
                    "0%, 100%": {
                        "transform": "rotate(-15deg)",
                        "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
                    },
                    "50%": {
                        "transform": "rotate(15deg)",
                        "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
                    },
                },
            },
            animation: {
                floating: "floating 5s ease-in-out infinite",
                wiggle: "wiggle 20s ease-in-out infinite",
            },
        },

        borderRadius: {
            none: "0px",
            DEFAULT: "10px",
            sm: "4px",
            lg: "14px",
            full: "9999px",
        },
        colors: {
            white: "white",
            black: "black",
            inherit: "inherit",
            current: "currentColor",
            transparent: "transparent",

            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
                DEFAULT: "hsl(var(--primary))",
                hover: "hsl(var(--primary-hover))",
            },
            gray: {
                DEFAULT: "hsl(var(--gray))",
                dark: "hsl(var(--gray-dark))",
                light: "hsl(var(--gray-light))",
                bg: "hsl(var(--gray-bg))",
            },
            fields: {
                DEFAULT: "hsl(var(--fields))",
                hover: "hsl(var(--fields-hover))",
            },
            destructive: "hsl(var(--destructive))",
        },
    },
    plugins: [require("tailwindcss-animate")],
};

// eslint-disable-next-line import/no-default-export -- lib requirements
export default config;
