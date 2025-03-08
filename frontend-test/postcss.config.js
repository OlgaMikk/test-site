const cssnanoConfig =
    process.env.NODE_ENV === 'production' ? { cssnano: {} } : {};

/** @type {import('postcss-load-config').Config} */
module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {},
        'postcss-flexbugs-fixes': {},
        'postcss-preset-env': {
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
            features: {
                'custom-properties': false,
            },
        },
        ...cssnanoConfig,
    },
};
