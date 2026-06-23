import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { sendEmail } from '@/utils/sendEmail';
import {
    QUESTIONS,
    SKILL_LABELS,
    GradedSkill,
    LS_KEY,
    LS_LEAD_KEY,
    computeResult,
    skillRec,
    formatPhone,
    phoneDigits,
} from '@/lib/levelTest';
import { useSpeech } from './useSpeech';
import { SpeakingCard } from './SpeakingCard';

type Screen = 'intro' | 'quiz' | 'lead' | 'result';
type Answers = Record<number, number>;

interface PersistedState {
    idx: number;
    answers: Answers;
    spoken: boolean;
    started: boolean;
    done: boolean;
    result?: { code: string };
}

const GRADED_SKILLS: GradedSkill[] = ['grammar', 'vocab', 'reading', 'listening'];

const AudioIcon: FC = () => (
    <svg
        className="listen-ico"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M19 5a9 9 0 0 1 0 14" />
    </svg>
);

const renderPrompt = (prompt: string) => {
    const parts = prompt.split('{gap}');
    return parts.map((part, i) => (
        <Fragment key={i}>
            {part}
            {i < parts.length - 1 && <span className="gap">?</span>}
        </Fragment>
    ));
};

/** Listening task — play button with up to 3 replays. Remounts per question via key. */
const ListeningBox: FC<{ audio: string; speak: ReturnType<typeof useSpeech> }> = ({ audio, speak }) => {
    const MAX = 3;
    const [plays, setPlays] = useState(0);
    const [playing, setPlaying] = useState(false);

    const onPlay = () => {
        if (plays >= MAX) return;
        const next = plays + 1;
        setPlays(next);
        speak(
            audio,
            () => setPlaying(true),
            () => setPlaying(false),
        );
    };

    return (
        <>
            <div className="listen-hint">Нажми, чтобы прослушать фразу (можно повторить).</div>
            <div className="listen-box">
                <button
                    type="button"
                    className={`listen-btn${playing ? ' playing' : ''}`}
                    onClick={onPlay}
                    disabled={plays >= MAX}
                >
                    <AudioIcon />
                    <span>Прослушать</span>
                </button>
                <span className="listen-replays">
                    {plays >= MAX ? 'Воспроизведения закончились' : `Осталось воспроизведений: ${MAX - plays}`}
                </span>
            </div>
            <div style={{ height: 22 }} />
        </>
    );
};

export const LevelTest: FC = () => {
    const speak = useSpeech();

    const [screen, setScreen] = useState<Screen>('intro');
    const [idx, setIdx] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [spoken, setSpoken] = useState(false);
    const [started, setStarted] = useState(false);
    const [done, setDone] = useState(false);
    const [resultCode, setResultCode] = useState('');

    const [barScrolled, setBarScrolled] = useState(false);
    const [skillsAnimated, setSkillsAnimated] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const hydrated = useRef(false);

    // ---- Lead form fields ----
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [telegram, setTelegram] = useState('');
    const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean; email?: boolean }>({});

    // Load persisted progress on mount.
    useEffect(() => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            if (raw) {
                const s = JSON.parse(raw) as PersistedState;
                setIdx(s.idx ?? 0);
                setAnswers(s.answers ?? {});
                setSpoken(!!s.spoken);
                setStarted(!!s.started);
                setDone(!!s.done);
                if (s.result?.code) setResultCode(s.result.code);
            }
        } catch {
            /* noop */
        }
        hydrated.current = true;
    }, []);

    // Persist progress.
    useEffect(() => {
        if (!hydrated.current) return;
        try {
            const s: PersistedState = { idx, answers, spoken, started, done, result: { code: resultCode } };
            localStorage.setItem(LS_KEY, JSON.stringify(s));
        } catch {
            /* noop */
        }
    }, [idx, answers, spoken, started, done, resultCode]);

    // Sticky bar shadow.
    useEffect(() => {
        const onScroll = () => setBarScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Animate skill bars when the result screen appears.
    useEffect(() => {
        if (screen !== 'result') {
            setSkillsAnimated(false);
            return;
        }
        const t = setTimeout(() => setSkillsAnimated(true), 80);
        return () => clearTimeout(t);
    }, [screen]);

    const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const show = useCallback((s: Screen) => {
        setScreen(s);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const total = QUESTIONS.length;
    const q = QUESTIONS[idx];
    const answeredCount = Object.keys(answers).length;

    const resetTest = () => {
        setIdx(0);
        setAnswers({});
        setSpoken(false);
        setStarted(false);
        setDone(false);
        setResultCode('');
    };

    const startTest = () => {
        if (done) resetTest();
        setStarted(true);
        show('quiz');
    };

    const selectOption = (optionIdx: number) => {
        setAnswers(prev => ({ ...prev, [idx]: optionIdx }));
    };

    const next = () => {
        if (idx < total - 1) {
            setIdx(idx + 1);
            goTop();
        } else {
            const r = computeResult(answers);
            setResultCode(r.band.code);
            setDone(true);
            show('lead');
        }
    };

    const back = () => {
        if (idx > 0) {
            setIdx(idx - 1);
            goTop();
        }
    };

    const submitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = {
            name: !name.trim(),
            phone: phoneDigits(phone).length < 11,
            email: !/^\S+@\S+\.\S+$/.test(email.trim()),
        };
        setErrors(errs);
        if (errs.name || errs.phone || errs.email) return;

        setSubmitting(true);
        const r = computeResult(answers);
        const perSkillTxt = GRADED_SKILLS.map(sk => {
            const d = r.perSkill[sk];
            const ratio = d && d.max ? d.got / d.max : 0;
            return `${SKILL_LABELS[sk]}: ${Math.round(ratio * 100)}%`;
        }).join(', ');

        const lead = {
            name: name.trim(),
            phone,
            email: email.trim(),
            telegram: telegram.trim(),
            level: r.band.code,
            source: 'level-test',
            spoken,
        };
        try {
            localStorage.setItem(LS_LEAD_KEY, JSON.stringify(lead));
        } catch {
            /* noop */
        }

        await sendEmail({
            email: lead.email,
            subject: `Тест уровня: ${r.band.code} — ${lead.name}`,
            text:
                `Источник: Тест уровня (level-test)\n` +
                `Имя: ${lead.name}\n` +
                `Телефон: ${lead.phone}\n` +
                `Email: ${lead.email}\n` +
                `Telegram: ${lead.telegram || '—'}\n` +
                `Уровень CEFR: ${r.band.code} (${r.band.name})\n` +
                `По навыкам: ${perSkillTxt}\n` +
                `Устный ответ записан: ${spoken ? 'да' : 'нет'}`,
            greetings: '',
        });

        setSubmitting(false);
        show('result');
    };

    const result = computeResult(answers);

    return (
        <div className="uyRoot">
            <header className={`bar${barScrolled ? ' scrolled' : ''}`}>
                <Link className="brand" href="/">
                    <span className="brand-mark">U</span>
                    <span className="brand-text">
                        Update You
                        <br />
                        Тест уровня
                    </span>
                </Link>
                <Link className="bar-back" href="/">
                    ← На сайт
                </Link>
            </header>

            <main className="stage">
                {/* ===== INTRO ===== */}
                <section className={`screen${screen === 'intro' ? ' active' : ''}`}>
                    <div className="eyebrow">— Бесплатный тест · без регистрации</div>
                    <h1 className="intro-title">
                        Узнай свой уровень английского за <em>5 минут</em>
                    </h1>
                    <p className="intro-lead">
                        Короткий тест на грамматику, лексику, чтение и аудирование. В конце — точный CEFR-уровень, разбор
                        по навыкам и персональные рекомендации, что прокачать первым.
                    </p>

                    <div className="intro-points">
                        <div className="ipoint">
                            <span className="ipoint-num">01</span>
                            <div className="ipoint-body">
                                <h3>Реальный уровень, а не самооценка</h3>
                                <p>15 заданий нарастающей сложности — от A2 до C1. Покажем, где именно затык.</p>
                            </div>
                        </div>
                        <div className="ipoint">
                            <span className="ipoint-num">02</span>
                            <div className="ipoint-body">
                                <h3>Разбор по 4 навыкам</h3>
                                <p>Грамматика, лексика, чтение и аудирование — отдельно по каждому.</p>
                            </div>
                        </div>
                        <div className="ipoint">
                            <span className="ipoint-num">03</span>
                            <div className="ipoint-body">
                                <h3>План, что делать дальше</h3>
                                <p>Персональные рекомендации под твой уровень и подходящий формат клуба.</p>
                            </div>
                        </div>
                    </div>

                    <div className="intro-meta">
                        <span className="meta-chip">
                            <strong>~5 минут</strong>
                        </span>
                        <span className="meta-chip">
                            <strong>15 заданий</strong>
                        </span>
                        <span className="meta-chip">
                            + <strong>аудирование</strong> вслух
                        </span>
                        <span className="meta-chip">
                            + <strong>устное</strong> задание (по желанию)
                        </span>
                    </div>

                    <div className="intro-cta">
                        <button className="btn btn-lg" onClick={startTest}>
                            {done ? 'Пройти заново →' : started && answeredCount > 0 ? 'Продолжить тест →' : 'Начать тест →'}
                        </button>
                        {!done && started && answeredCount > 0 && (
                            <span className="intro-note">
                                Продолжишь с вопроса {idx + 1} из {total}
                            </span>
                        )}
                    </div>
                </section>

                {/* ===== QUIZ ===== */}
                <section className={`screen${screen === 'quiz' ? ' active' : ''}`}>
                    <div className="q-head">
                        <div className="progress-row">
                            <span>
                                Вопрос {idx + 1} из {total}
                            </span>
                            <span>{SKILL_LABELS[q.skill]}</span>
                        </div>
                        <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${(idx / total) * 100}%` }} />
                        </div>
                    </div>

                    <div id="q-body">
                        <div className="q-tag">
                            {SKILL_LABELS[q.skill]}
                            {q.lvl ? ` · ${q.lvl}` : ''}
                        </div>

                        {q.speaking ? (
                            <>
                                <div className="q-prompt">{q.prompt}</div>
                                <SpeakingCard key={idx} sub={q.sub} onRecorded={() => setSpoken(true)} />
                            </>
                        ) : (
                            <>
                                {q.skill === 'listening' && q.audio && (
                                    <ListeningBox key={idx} audio={q.audio} speak={speak} />
                                )}
                                {q.passage && <div className="q-passage">{q.passage}</div>}
                                <div className="q-prompt">{renderPrompt(q.prompt)}</div>
                                {q.sub && <div className="q-sub">{q.sub}</div>}
                                <div className="options">
                                    {q.options?.map((text, oi) => (
                                        <button
                                            key={oi}
                                            type="button"
                                            className={`opt${answers[idx] === oi ? ' selected' : ''}`}
                                            onClick={() => selectOption(oi)}
                                        >
                                            <span className="opt-key">{String.fromCharCode(65 + oi)}</span>
                                            <span>{text}</span>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="q-foot">
                        <button
                            className="btn btn-ghost"
                            onClick={back}
                            style={{ visibility: idx === 0 ? 'hidden' : 'visible' }}
                        >
                            ← Назад
                        </button>
                        <button
                            className="btn"
                            onClick={next}
                            disabled={!q.speaking && answers[idx] === undefined}
                        >
                            {idx === total - 1 ? 'Завершить →' : 'Дальше →'}
                        </button>
                    </div>
                </section>

                {/* ===== LEAD ===== */}
                <section className={`screen${screen === 'lead' ? ' active' : ''}`}>
                    <div className="lead-card">
                        <div className="eyebrow lead-eyebrow">— Результат готов</div>
                        <h2 className="lead-title">
                            Куда прислать <em>подробный разбор?</em>
                        </h2>
                        <p className="lead-sub">
                            Уровень покажем сразу. А детальный разбор по навыкам с рекомендациями куратора отправим тебе —
                            и поможем составить план.
                        </p>

                        <div className="lead-preview">
                            <span className="lead-preview-level">{resultCode || result.band.code}</span>
                            <span className="lead-preview-txt">
                                Твой предварительный уровень.
                                <br />
                                Полный разбор — на следующем экране.
                            </span>
                        </div>

                        <form className="lead-form" onSubmit={submitLead} noValidate>
                            <div className="field">
                                <label htmlFor="l-name">Имя</label>
                                <input
                                    id="l-name"
                                    type="text"
                                    className={errors.name ? 'err' : ''}
                                    placeholder="Как к тебе обращаться"
                                    autoComplete="given-name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="l-phone">Телефон</label>
                                <input
                                    id="l-phone"
                                    type="tel"
                                    inputMode="tel"
                                    className={errors.phone ? 'err' : ''}
                                    placeholder="+7 (___) ___-__-__"
                                    autoComplete="tel"
                                    value={phone}
                                    onFocus={() => !phone && setPhone('+7 (')}
                                    onChange={e => setPhone(formatPhone(e.target.value))}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="l-email">Email</label>
                                <input
                                    id="l-email"
                                    type="email"
                                    className={errors.email ? 'err' : ''}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="l-tg">Telegram — по желанию</label>
                                <input
                                    id="l-tg"
                                    type="text"
                                    placeholder="@username"
                                    autoComplete="off"
                                    value={telegram}
                                    onChange={e => setTelegram(e.target.value)}
                                />
                                <span className="field-hint">
                                    Если аккаунт не привязан к номеру — оставь ник, чтобы мы написали в чат.
                                </span>
                            </div>
                            <button type="submit" className="lead-submit" disabled={submitting}>
                                {submitting ? 'Отправляем…' : 'Показать разбор и рекомендации'}
                            </button>
                        </form>
                        <button
                            type="button"
                            className="lead-skip"
                            onClick={() => show('result')}
                            style={{ background: 'none', border: 0 }}
                        >
                            Пропустить и посмотреть результат →
                        </button>
                        <p className="lead-privacy">
                            Нажимая кнопку, ты соглашаешься на обработку персональных данных. Без спама — только разбор и
                            приглашение на диагностику.
                        </p>
                    </div>
                </section>

                {/* ===== RESULT ===== */}
                <section className={`screen${screen === 'result' ? ' active' : ''}`}>
                    <div className="res-level-wrap">
                        <div className="res-level-label">Твой уровень английского</div>
                        <div className="res-level">{result.band.code}</div>
                        <div className="res-band-name">{result.band.name}</div>
                    </div>
                    <p className="res-summary">{result.band.summary}</p>

                    <div className="skills">
                        {GRADED_SKILLS.map(sk => {
                            const d = result.perSkill[sk] ?? { got: 0, max: 1 };
                            const ratio = d.max ? d.got / d.max : 0;
                            return (
                                <div className="skill-row" key={sk}>
                                    <div className="skill-top">
                                        <span className="skill-name">{SKILL_LABELS[sk]}</span>
                                        <span className="skill-val">{Math.round(ratio * 100)}%</span>
                                    </div>
                                    <div className="skill-track">
                                        <div
                                            className="skill-fill"
                                            style={{ width: skillsAnimated ? `${Math.max(6, ratio * 100)}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {spoken && (
                        <div className="res-spoken" style={{ display: 'flex' }}>
                            <span>🎙️</span>
                            <span>
                                <b>Устный ответ записан.</b> Преподаватель прослушает его на бесплатной диагностике и
                                оценит произношение, беглость и грамматику в речи — то, что текстовый тест не покажет.
                            </span>
                        </div>
                    )}

                    <h2 className="res-section-title">Что прокачать дальше</h2>
                    <div className="recs">
                        {GRADED_SKILLS.map(sk => {
                            const d = result.perSkill[sk] ?? { got: 0, max: 1 };
                            return { sk, ratio: d.max ? d.got / d.max : 0 };
                        })
                            .sort((a, b) => a.ratio - b.ratio)
                            .slice(0, 2)
                            .map((p, i) => {
                                const rec = skillRec(p.sk, p.ratio);
                                return (
                                    <div className="rec" key={p.sk}>
                                        <span className="rec-num">{`0${i + 1}`}</span>
                                        <div className="rec-body">
                                            <h4>{rec.h}</h4>
                                            <p>{rec.p}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        <div className="rec">
                            <span className="rec-num">03</span>
                            <div className="rec-body">
                                <h4>Подходящий формат</h4>
                                <p>{result.band.club}</p>
                            </div>
                        </div>
                    </div>

                    <div className="res-cta">
                        <span className="res-cta-fit">Рекомендуем: {result.band.fit}</span>
                        <h3>Разбери результат с куратором — бесплатно</h3>
                        <p>
                            20 минут по видеосвязи: подтвердим уровень в живой речи, найдём главный затык и составим план.
                            Без давления и продаж.
                        </p>
                        <div className="res-cta-row">
                            <Link className="btn btn-lg" href="/#price">
                                Записаться на диагностику →
                            </Link>
                            <Link className="btn btn-ghost" href="/">
                                На сайт Update You
                            </Link>
                        </div>
                    </div>

                    <div className="res-restart">
                        <button
                            className="btn btn-ghost"
                            onClick={() => {
                                resetTest();
                                show('intro');
                            }}
                        >
                            Пройти заново
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};
