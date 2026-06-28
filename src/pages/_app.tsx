import Layout from '@/components/navigation/Layout/Layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../../public/fonts/fonts.css';
import '../../public/normalize.css';
import '../globals.scss';
import '../styles/landing.scss';
import '../styles/level-test.scss';
import '../styles/not-found.scss';
import Script from 'next/script';
import { useYandexMetrikaRouter, YM_COUNTER_ID } from '@/hooks/useYandexMetrika';

function MyApp({ Component, pageProps }: AppProps) {
    useYandexMetrikaRouter();
    // TODO проверить какие правильный иконки сюда нужно ставить, в public/icons есть файл site.webmanifest. может быть лучше подключить его?
    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
            {/* Yandex.Metrika counter */}
            <Script
                id="yandex-metrika"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(m,e,t,r,i,k,a){
                            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                            m[i].l=1*new Date();
                            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_COUNTER_ID}', 'ym');
                        ym(${YM_COUNTER_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
                    `,
                }}
            />
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${YM_COUNTER_ID}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
            {/* /Yandex.Metrika counter */}
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
