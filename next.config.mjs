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
};

export default nextConfig;
