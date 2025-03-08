/** @type {import('prettier').Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig} */
const config = {
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    singleQuote: false,
    jsxSingleQuote: false,
    trailingComma: "all",
    quoteProps: "consistent",
    tabWidth: 4,
    endOfLine: "auto",
    useTabs: false,
    semi: true,
    printWidth: 80,
    plugins: [
        "@ianvs/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],
    importOrder: [
        "<BUILTIN_MODULES>",
        "",
        // match "react" only if it's the first import
        "^react$",
        "react-dom",
        "",
        "<THIRD_PARTY_MODULES>",
        "",
        "^@(/.*)$",
        "",
        "^(?!.*[.]css$)[./].*$",
        "",
        ".(css|pcss)$",
    ],
    tailwindFunctions: ["cva", "cn"],
};

export default config;
