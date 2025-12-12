import Head from 'next/head';
import { FC } from 'react';
import { jsonld } from './jsonld';

interface SEOProps {
    title: string;
    description: string;
    keywords: string;
}

const SEO: FC<SEOProps> = ({ title, description, keywords }) => {
    const og_image = 'https://updateyou.ru/icons/android-chrome-512x512.png';

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <link rel="canonical" href="https://updateyou.ru" />

            <meta property="og:site_name" content="Update" />
            <meta property="og:locale" content="ru_RU" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://updateyou.ru" />
            <meta property="og:image" content={og_image} />
            <meta property="og:image:secure_url" content={og_image} />
            <meta property="og:image:alt" content={title} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="50" />
            <meta property="og:image:height" content="50" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={og_image} />

            <script type="application/ld+json">{JSON.stringify(jsonld)}</script>
        </Head>
    );
};

export default SEO;
