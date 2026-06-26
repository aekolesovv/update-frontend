import { RefObject, useEffect } from 'react';

/**
 * Adds the `in` class to every `.reveal` element inside the given root
 * once it scrolls into view — mirrors the IntersectionObserver from the
 * original design export.
 */
export const useScrollReveal = (rootRef: RefObject<HTMLElement>) => {
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));

        if (typeof IntersectionObserver === 'undefined') {
            els.forEach(el => el.classList.add('in'));
            return;
        }

        const io = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12 },
        );

        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, [rootRef]);
};
