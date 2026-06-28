import { useEffect } from 'react';
import { useRouter } from 'next/router';

declare global {
    interface Window {
        ym: (counterId: number, method: string, ...args: any[]) => void;
    }
}

// Единый ID счётчика Яндекс.Метрики (тот же используется в инлайн-коде в _app.tsx)
export const YM_COUNTER_ID = 106109589;
const COUNTER_ID = YM_COUNTER_ID;

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

        // Начальный хит Метрика отправляет сама при init() в _app.tsx —
        // здесь трекаем только SPA-переходы, чтобы не задваивать первую страницу.

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);
};

