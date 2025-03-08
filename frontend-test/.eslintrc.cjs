const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");

/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    extends: [
        "next/core-web-vitals",
        "prettier",
        "plugin:tailwindcss/recommended",
    ],
    parserOptions: {
        project,
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
        "tailwindcss": {
            cssFiles: ["**/*.{pcss,css}"],
            callees: ["cva", "cn"],
        },
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "import/order": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "react/hook-use-state": [1, { allowDestructuredState: true }],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "no-console": "error",
    },
};
