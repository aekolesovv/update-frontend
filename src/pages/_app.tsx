import Layout from '@/components/navigation/Layout/Layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../../public/fonts/fonts.css';
import '../../public/normalize.css';
import '../globals.scss';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
    // TODO проверить какие правильный иконки сюда нужно ставить, в public/icons есть файл site.webmanifest. может быть лучше подключить его?
    return (
        <Layout>
            <Head>
                <link rel="icon" href="/icons/favicon.ico" />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/favicon-16x16.png"
                />
                <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
            </Head>
            <Script
                src="https://widget.prodamus.ru/src/init.js"
                strategy="afterInteractive"
            />
            <link
                rel="stylesheet"
                href="https://widget.prodamus.ru/src/init.css"
            />
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
