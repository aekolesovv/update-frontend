/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
