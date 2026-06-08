import { FC, useEffect, useRef, useState } from 'react';
import { PlugPopup } from '@/components/PlugPopup/PlugPopup';
import { useScrollReveal } from './useScrollReveal';
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
    const [leadTitle, setLeadTitle] = useState<string | null>(null);

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

    const onLead = (title: string) => setLeadTitle(title);

    return (
        <>
            <div className="uyRoot" ref={rootRef}>
                <Nav onLead={onLead} />
                <Hero onLead={onLead} />
                <Marquee />
                <Problem />
                <Method />
                <Founders />
                <Format onLead={onLead} />
                <Program />
                <Platform />
                <Reviews />
                <AriaBanner onLead={onLead} />
                <Pricing onLead={onLead} />
                <Personal onLead={onLead} />
                <Faq />
                <FinalFooter />
            </div>

            <PlugPopup
                isOpened={leadTitle !== null}
                setIsOpened={opened => {
                    if (!opened) setLeadTitle(null);
                }}
                title={leadTitle ?? ''}
            />
        </>
    );
};
