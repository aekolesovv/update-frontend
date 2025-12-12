/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
const SCREENBREAKPOINT = 1320;

export const useResize = () => {
    // Всегда используем одинаковое начальное значение для SSR и клиента
    const [width, setWidth] = useState(1920);

    useEffect(() => {
        // Устанавливаем реальное значение только на клиенте после монтирования
        if (typeof window !== 'undefined') {
            setWidth(window.innerWidth);

            const handleResize = (event: any) => {
                setWidth(event.target.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return {
        width,
        isBreakpoint: width > SCREENBREAKPOINT,
    };
};
