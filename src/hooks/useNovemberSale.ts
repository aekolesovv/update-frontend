import { useEffect, useState } from 'react';
import { isNovemberSale, NOVEMBER_SALE_END, NOVEMBER_SALE_START } from '@/utils/novemberSale';

export const useNovemberSale = (): boolean => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const refresh = () => {
            clearTimeout(timer);
            const now = Date.now();
            setActive(isNovemberSale(now));
            const nextChange = now < NOVEMBER_SALE_START ? NOVEMBER_SALE_START : NOVEMBER_SALE_END;
            if (now < nextChange) timer = setTimeout(refresh, Math.min(nextChange - now, 2_147_483_647));
        };

        refresh();
        window.addEventListener('pageshow', refresh);
        document.addEventListener('visibilitychange', refresh);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('pageshow', refresh);
            document.removeEventListener('visibilitychange', refresh);
        };
    }, []);

    return active;
};
