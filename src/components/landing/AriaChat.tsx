import { FC, useEffect, useRef } from 'react';

type Segment = { text: string; cls?: string };
type Step =
    | { type: 'user'; text: string }
    | { type: 'ai'; segments: Segment[] }
    | { type: 'correction' }
    | { type: 'typing' };

const SEQ: Step[] = [
    { type: 'user', text: 'I will go to my friend birthday this weekend.' },
    {
        type: 'ai',
        segments: [
            { text: 'Almost! ' },
            { text: "my friend's birthday", cls: 'aria-fix' },
            { text: ' — you need the possessive apostrophe. Also, ' },
            { text: "I'm going to", cls: 'aria-fix' },
            { text: ' sounds more natural for a planned event.' },
        ],
    },
    { type: 'correction' },
    { type: 'user', text: 'Got it. Which mistakes do I make most often?' },
    { type: 'typing' },
];

/**
 * Live "session with AILina" chat animation. Faithful port of the imperative
 * script from the design export — builds DOM into a container and loops while
 * the banner is on screen.
 */
export const AriaChat: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const timers = new Set<ReturnType<typeof setTimeout>>();
        let stopped = false;

        const wait = (ms: number, cb: () => void) => {
            const t = setTimeout(() => {
                timers.delete(t);
                if (!stopped) cb();
            }, ms);
            timers.add(t);
        };

        const makeAva = (role: 'user' | 'ai') => {
            const d = document.createElement('div');
            d.className = 'aria-ava ' + (role === 'user' ? 'you' : 'ai');
            d.textContent = role === 'ai' ? 'AI' : 'You';
            return d;
        };

        const makeRow = (role: 'user' | 'ai') => {
            const row = document.createElement('div');
            row.className = 'aria-msg-anim ' + (role === 'user' ? 'user' : '');
            row.appendChild(makeAva(role));
            const bubble = document.createElement('div');
            bubble.className = 'aria-bubble ' + (role === 'user' ? 'you' : 'ai');
            row.appendChild(bubble);
            return { row, bubble };
        };

        const streamText = (el: HTMLElement, text: string, speed: number, done: () => void) => {
            let i = 0;
            const tick = () => {
                if (i >= text.length) return done();
                const next = text.indexOf(' ', i);
                const end = next === -1 ? text.length : next + 1;
                el.textContent = text.slice(0, end);
                i = end;
                wait(speed + Math.random() * 30, tick);
            };
            tick();
        };

        const streamSegments = (bubble: HTMLElement, segs: Segment[], idx: number, done: () => void) => {
            if (idx >= segs.length) return done();
            const seg = segs[idx];
            const span = document.createElement('span');
            if (seg.cls) span.className = seg.cls;
            bubble.appendChild(span);
            streamText(span, seg.text, 45, () => streamSegments(bubble, segs, idx + 1, done));
        };

        const runStep = (step: Step, done: () => void) => {
            if (step.type === 'user') {
                const { row, bubble } = makeRow('user');
                container.appendChild(row);
                streamText(bubble, step.text, 55, () => wait(400, done));
            } else if (step.type === 'ai') {
                const { row, bubble } = makeRow('ai');
                container.appendChild(row);
                wait(600, () => streamSegments(bubble, step.segments, 0, () => wait(400, done)));
            } else if (step.type === 'correction') {
                const pill = document.createElement('div');
                pill.className = 'aria-corr-anim';
                pill.innerHTML =
                    '<span class="from">I will go to my friend birthday</span>' +
                    '<span class="arrow">→</span>' +
                    '<span class="to">I\'m going to my friend\'s birthday</span>';
                container.appendChild(pill);
                wait(600, done);
            } else {
                const { row, bubble } = makeRow('ai');
                bubble.className = 'aria-typing';
                bubble.innerHTML = '<span></span><span></span><span></span>';
                container.appendChild(row);
                wait(2800, done);
            }
        };

        const runAll = (i: number, onDone: () => void) => {
            if (i >= SEQ.length) return onDone();
            runStep(SEQ[i], () => runAll(i + 1, onDone));
        };

        const loop = () => {
            container.innerHTML = '';
            runAll(0, () => wait(1800, loop));
        };

        const banner = container.closest('section');
        let io: IntersectionObserver | null = null;
        if (banner && typeof IntersectionObserver !== 'undefined') {
            io = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting) {
                        io?.disconnect();
                        loop();
                    }
                },
                { threshold: 0.3 },
            );
            io.observe(banner);
        } else {
            loop();
        }

        return () => {
            stopped = true;
            io?.disconnect();
            timers.forEach(t => clearTimeout(t));
            container.innerHTML = '';
        };
    }, []);

    return <div id="aria-chat-anim" ref={containerRef} />;
};
