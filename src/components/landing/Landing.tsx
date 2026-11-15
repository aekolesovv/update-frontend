import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useScrollReveal } from './useScrollReveal';
import { LeadModal } from './modal/LeadModal';
import { ModalSource } from './modal/pitches';
import { NovemberSaleBanner } from './NovemberSaleBanner';
import { useNovemberSale } from '@/hooks/useNovemberSale';
import { getClubOffer } from '@/utils/novemberSale';
import {
    Nav,
    Hero,
    Marquee,
    Problem,
    Method,
    Founders,
    Format,
    Program,
    Platform,
    Reviews,
    AriaBanner,
    Pricing,
    Personal,
    Faq,
    FinalFooter,
} from './sections';

export const Landing: FC = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [modalSource, setModalSource] = useState<ModalSource | null>(null);
    const saleActive = useNovemberSale();
    const showSaleBanner = getClubOffer('plan-1', saleActive).onSale;

    useScrollReveal(rootRef);

    // FAQ accordion: close other open <details> when one opens.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const items = Array.from(root.querySelectorAll<HTMLDetailsElement>('.faq details'));
        const handlers: Array<() => void> = [];
        items.forEach(d => {
            const onToggle = () => {
                if (d.open) items.forEach(o => o !== d && (o.open = false));
            };
            d.addEventListener('toggle', onToggle);
            handlers.push(() => d.removeEventListener('toggle', onToggle));
        });
        return () => handlers.forEach(off => off());
    }, []);

    const openModal = useCallback((source: ModalSource) => setModalSource(source), []);
    const closeModal = useCallback(() => setModalSource(null), []);
    const scrollToPrice = useCallback(() => {
        rootRef.current?.querySelector('#price')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <div className={`uyRoot${showSaleBanner ? ' uyRoot--november-sale' : ''}`} ref={rootRef}>
            <Nav onModal={openModal} />
            {showSaleBanner && <NovemberSaleBanner />}
            <Hero onModal={openModal} />
            <Marquee />
            <Problem />
            <Method />
            <Founders />
            <Format />
            <Program />
            <Platform />
            <Reviews />
            <AriaBanner onModal={openModal} />
            <Pricing onModal={openModal} saleActive={saleActive} />
            <Personal onModal={openModal} saleActive={saleActive} />
            <Faq />
            <FinalFooter onModal={openModal} />

            <LeadModal source={modalSource} onClose={closeModal} onScrollToPrice={scrollToPrice} saleActive={saleActive} />
        </div>
    );
};
