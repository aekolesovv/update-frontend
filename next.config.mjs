const staticExport = process.env.STATIC_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: staticExport ? 'export' : undefined,
    images: {
        unoptimized: staticExport,
        domains: ['tatbayar.ru'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tatbayar.ru',
                pathname: '/api/images/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
