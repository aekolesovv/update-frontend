import Layout from '@/components/navigation/Layout/Layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../../public/fonts/fonts.css';
import '../../public/normalize.css';
import '../globals.scss';
import { persistor, store } from '../services/redux/store';

function MyApp({ Component, pageProps }: AppProps) {
    // TODO проверить какие правильный иконки сюда нужно ставить, в public/icons есть файл site.webmanifest. может быть лучше подключить его?
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
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
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
