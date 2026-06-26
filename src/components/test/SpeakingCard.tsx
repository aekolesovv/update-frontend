import { FC, useEffect, useRef, useState } from 'react';

interface SpeakingCardProps {
    sub?: string;
    onRecorded: () => void;
}

type Status = { text: string; done?: boolean };

/** Optional speaking task: records a short answer via MediaRecorder (auto-stop 60s). */
export const SpeakingCard: FC<SpeakingCardProps> = ({ sub, onRecorded }) => {
    const [recording, setRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [status, setStatus] = useState<Status>({ text: 'Микрофон не записывается без твоего разрешения.' });
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [hasRecorded, setHasRecorded] = useState(false);

    const recRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const cleanupTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const stopTracks = () => {
        streamRef.current?.getTracks().forEach(t => t.stop());
        streamRef.current = null;
    };

    // Cleanup on unmount.
    useEffect(() => {
        return () => {
            cleanupTimer();
            try {
                if (recRef.current && recRef.current.state !== 'inactive') recRef.current.stop();
            } catch {
                /* noop */
            }
            stopTracks();
            if (audioUrl) URL.revokeObjectURL(audioUrl);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stopRec = () => {
        if (recRef.current && recRef.current.state !== 'inactive') recRef.current.stop();
        setRecording(false);
        cleanupTimer();
    };

    const startRec = () => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(stream => {
                streamRef.current = stream;
                chunksRef.current = [];
                const rec = new MediaRecorder(stream);
                recRef.current = rec;
                rec.ondataavailable = e => {
                    if (e.data.size) chunksRef.current.push(e.data);
                };
                rec.onstop = () => {
                    const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' });
                    setAudioUrl(prev => {
                        if (prev) URL.revokeObjectURL(prev);
                        return URL.createObjectURL(blob);
                    });
                    setHasRecorded(true);
                    setStatus({ text: '✓ Ответ записан. Преподаватель прослушает его на диагностике.', done: true });
                    onRecorded();
                    stopTracks();
                };
                rec.start();
                setRecording(true);
                setSeconds(0);
                setStatus({ text: 'Идёт запись… говори спокойно.' });
                timerRef.current = setInterval(() => {
                    setSeconds(prev => {
                        const next = prev + 1;
                        if (next >= 60) stopRec();
                        return next;
                    });
                }, 1000);
            })
            .catch(() => {
                setStatus({ text: 'Доступ к микрофону не дан — можно пропустить задание.' });
            });
    };

    const toggle = () => {
        if (typeof navigator === 'undefined' || !navigator.mediaDevices || typeof MediaRecorder === 'undefined') {
            setStatus({ text: 'Запись недоступна в этом браузере — ничего страшного, можно пропустить.' });
            return;
        }
        if (!recording) startRec();
        else stopRec();
    };

    const mmss = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    const label = recording ? 'Остановить' : hasRecorded ? 'Записать заново' : 'Записать ответ';

    return (
        <div className="speak-card">
            {sub && <div className="q-sub" style={{ marginTop: 0 }}>{sub}</div>}
            <div className="speak-controls">
                <button type="button" className={`rec-btn${recording ? ' recording' : ''}`} onClick={toggle}>
                    <span className="rec-dot" />
                    <span className="rec-label">{label}</span>
                </button>
                <span className="rec-time">{mmss}</span>
            </div>
            <div className={`rec-status${status.done ? ' done' : ''}`}>{status.text}</div>
            {audioUrl && <audio controls src={audioUrl} />}
        </div>
    );
};
