/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
const SCREENBREAKPOINT = 1320;

export const useResize = () => {
    const [width, setWidth] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth;
        }
        return 1920; // дефолтное значение для SSR
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const handleResize = (event: any) => {
            setWidth(event.target.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        width,
        isBreakpoint: width > SCREENBREAKPOINT,
    };
};
