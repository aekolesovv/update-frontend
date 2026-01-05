import { useEffect } from 'react';
import { useRouter } from 'next/router';

declare global {
    interface Window {
        ym: (counterId: number, method: string, ...args: any[]) => void;
    }
}

const COUNTER_ID = 106109589;

export const useYandexMetrika = () => {
    // Функция для отправки hit
    const hit = (url?: string, options?: any) => {
        if (typeof window !== 'undefined' && window.ym) {
            window.ym(COUNTER_ID, 'hit', url || window.location.href, options);
        }
    };

    // Функция для достижения цели
    const reachGoal = (targetName: string) => {
        if (typeof window !== 'undefined' && window.ym) {
            window.ym(COUNTER_ID, 'reachGoal', targetName);
        }
    };

    // Функция для передачи параметров
    const params = (params: Record<string, any>) => {
        if (typeof window !== 'undefined' && window.ym) {
            window.ym(COUNTER_ID, 'params', params);
        }
    };

    return {
        hit,
        reachGoal,
        params,
    };
};

// Хук для автоматического отслеживания переходов между страницами
export const useYandexMetrikaRouter = () => {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (typeof window !== 'undefined' && window.ym) {
                window.ym(COUNTER_ID, 'hit', url);
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        // Отправляем hit для начальной страницы
        if (router.isReady) {
            if (typeof window !== 'undefined' && window.ym) {
                window.ym(COUNTER_ID, 'hit', window.location.href);
            }
        }

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events, router.isReady]);
};

