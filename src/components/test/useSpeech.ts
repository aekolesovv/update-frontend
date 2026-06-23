import { useCallback, useEffect, useRef } from 'react';

/** English speech-synthesis helper (en-GB preferred), used for listening tasks. */
export const useSpeech = () => {
    const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        const pick = () => {
            const vs = window.speechSynthesis.getVoices();
            if (!vs.length) return;
            voiceRef.current =
                vs.find(v => /en[-_]GB/i.test(v.lang)) ||
                vs.find(v => /en[-_]US/i.test(v.lang)) ||
                vs.find(v => /^en/i.test(v.lang)) ||
                null;
        };
        pick();
        window.speechSynthesis.onvoiceschanged = pick;
        return () => {
            try {
                window.speechSynthesis.onvoiceschanged = null;
                window.speechSynthesis.cancel();
            } catch {
                /* noop */
            }
        };
    }, []);

    return useCallback((text: string, onStart?: () => void, onEnd?: () => void) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) {
            onEnd?.();
            return;
        }
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-GB';
        u.rate = 0.95;
        u.pitch = 1;
        if (voiceRef.current) u.voice = voiceRef.current;
        u.onend = () => onEnd?.();
        u.onerror = () => onEnd?.();
        onStart?.();
        window.speechSynthesis.speak(u);
    }, []);
};
