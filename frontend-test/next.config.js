const isDevelopment = process.env.NODE_ENV !== "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    async rewrites() {
        return isDevelopment
            ? [
                  {
                      source: "/api/media/:path*/",
                      destination: `${process.env.NEXT_HOSTNAME}/api/media/:path*/`,
                  },
                  {
                      source: "/api/static/:path*/",
                      destination: `${process.env.NEXT_HOSTNAME}/api/static/:path*/`,
                  },
                  {
                      source: "/api/:path*/",
                      destination: `${process.env.NEXT_HOSTNAME}/api/:path*/`,
                  },
              ]
            : [];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                // hostname: process.env.NEXT_HOSTNAME.replace(/^https?:\/\//, ""),
                hostname: "storage.yandexcloud.net",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
