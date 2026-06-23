import { FC, useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { sendEmail, EmailStatus } from '@/utils/sendEmail';
import {
    ModalSource,
    PITCHES,
    SOURCE_LABELS,
    formatPhone,
    phoneDigits,
} from './pitches';

type Step = 'choice' | 'form' | 'success';

interface LeadFormData {
    name: string;
    phone: string;
    email: string;
    telegram: string;
}

interface LeadModalProps {
    source: ModalSource | null;
    onClose: () => void;
    /** Scroll to the pricing section (used by the "выбрать тариф" path). */
    onScrollToPrice: () => void;
}

export const LeadModal: FC<LeadModalProps> = ({ source, onClose, onScrollToPrice }) => {
    const open = source !== null;
    const [step, setStep] = useState<Step>('choice');
    const [status, setStatus] = useState<EmailStatus>('idle');
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LeadFormData>({ mode: 'onSubmit' });

    // Reset to the choice step every time the modal is (re)opened.
    useEffect(() => {
        if (open) {
            setStep('choice');
            setStatus('idle');
            reset();
            const t = setTimeout(() => closeBtnRef.current?.focus(), 50);
            return () => clearTimeout(t);
        }
    }, [open, source, reset]);

    // Lock background scroll + Escape to close.
    useEffect(() => {
        if (!open) return;
        document.documentElement.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.documentElement.style.overflow = '';
            document.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    if (!open) {
        return (
            <div className="modal-overlay" id="modal" role="dialog" aria-modal="true" aria-hidden="true" />
        );
    }

    const pitch = PITCHES[source];

    const handlePay = () => {
        if (source === 'trial' || source === 'club') {
            onClose();
            setTimeout(onScrollToPrice, 280);
        } else {
            // Payment is not wired yet (Prodamus pending) — capture as a lead instead.
            setStep('form');
        }
    };

    const onSubmit: SubmitHandler<LeadFormData> = async data => {
        setStatus('loading');
        const label = SOURCE_LABELS[source];
        const result = await sendEmail({
            email: data.email,
            subject: `Заявка с сайта: ${label}`,
            text:
                `Источник: ${label} (${source})\n` +
                `Имя: ${data.name}\n` +
                `Телефон: ${data.phone}\n` +
                `Email: ${data.email}\n` +
                `Telegram: ${data.telegram?.trim() || '—'}`,
            greetings: '',
        });
        if (result.success) {
            setStatus('success');
            setStep('success');
        } else {
            setStatus('error');
        }
    };

    return (
        <div
            className="modal-overlay open"
            id="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-hidden="false"
            onMouseDown={e => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="modal-panel">
                <button
                    type="button"
                    className="modal-close"
                    aria-label="Закрыть"
                    ref={closeBtnRef}
                    onClick={onClose}
                >
                    ×
                </button>

                {/* STEP 1 — choose path */}
                <section className={`modal-step${step === 'choice' ? ' active' : ''}`}>
                    <div className="modal-eyebrow">{pitch.eyebrow}</div>
                    <h2 className="modal-title" id="modal-title" dangerouslySetInnerHTML={{ __html: pitch.titleHtml }} />
                    <p className="modal-desc">{pitch.desc}</p>

                    <div className="modal-options">
                        <div
                            className="modal-option modal-option--primary"
                            role="button"
                            tabIndex={0}
                            onClick={() => setStep('form')}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setStep('form');
                                }
                            }}
                        >
                            <div className="modal-option-row">
                                <span className="modal-option-title">{pitch.pitchTitle}</span>
                                <span className="modal-option-arrow">→</span>
                            </div>
                            <p className="modal-option-pitch">{pitch.pitchLead}</p>
                            <ul className="modal-option-bullets">
                                {pitch.bullets.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                            <div className="modal-option-meta">Бесплатно · 20 минут</div>
                        </div>

                        <button type="button" className="modal-option modal-option--secondary" onClick={handlePay}>
                            <div className="modal-option-row">
                                <span className="modal-option-title">{pitch.payTitle}</span>
                                <span className="modal-option-arrow">→</span>
                            </div>
                            <p className="modal-option-sub">{pitch.paySub}</p>
                        </button>
                    </div>
                </section>

                {/* STEP 2 — consultation form */}
                <section className={`modal-step${step === 'form' ? ' active' : ''}`}>
                    <div className="modal-eyebrow">— Бесплатная диагностика</div>
                    <h2 className="modal-title">
                        Оставь <em>контакты</em>
                    </h2>
                    <p className="modal-desc">
                        Свяжемся в течение рабочего дня, чтобы согласовать удобное время. Без рассылок и спама.
                    </p>

                    <form className="modal-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="modal-field">
                            <label className="modal-label" htmlFor="f-name">
                                Имя
                            </label>
                            <input
                                className={`modal-input${errors.name ? ' error' : ''}`}
                                id="f-name"
                                type="text"
                                autoComplete="given-name"
                                placeholder="Как к тебе обращаться"
                                {...register('name', { required: true, minLength: 2 })}
                            />
                        </div>

                        <div className="modal-field">
                            <label className="modal-label" htmlFor="f-phone">
                                Телефон
                            </label>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ validate: v => phoneDigits(v).length >= 11 }}
                                render={({ field }) => (
                                    <input
                                        className={`modal-input${errors.phone ? ' error' : ''}`}
                                        id="f-phone"
                                        type="tel"
                                        inputMode="tel"
                                        autoComplete="tel"
                                        placeholder="+7 (___) ___-__-__"
                                        value={field.value || ''}
                                        onChange={e => field.onChange(formatPhone(e.target.value))}
                                        onFocus={e => {
                                            if (!e.target.value) field.onChange('+7 (');
                                        }}
                                    />
                                )}
                            />
                        </div>

                        <div className="modal-field">
                            <label className="modal-label" htmlFor="f-email">
                                Email
                            </label>
                            <input
                                className={`modal-input${errors.email ? ' error' : ''}`}
                                id="f-email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                            />
                        </div>

                        <div className="modal-field">
                            <label className="modal-label" htmlFor="f-tg">
                                Telegram{' '}
                                <span
                                    style={{
                                        textTransform: 'none',
                                        letterSpacing: 0,
                                        fontWeight: 400,
                                        color: 'var(--ink-soft)',
                                        opacity: 0.65,
                                    }}
                                >
                                    — по желанию
                                </span>
                            </label>
                            <input
                                className="modal-input"
                                id="f-tg"
                                type="text"
                                autoComplete="off"
                                placeholder="@username"
                                {...register('telegram')}
                            />
                            <div className="modal-hint">
                                Если твой Telegram-аккаунт не привязан к указанному номеру — оставь ник, чтобы мы смогли
                                написать в чат.
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="modal-hint" style={{ color: 'var(--accent)' }}>
                                Не удалось отправить. Попробуй ещё раз или напиши нам в Telegram.
                            </div>
                        )}

                        <button type="submit" className="modal-submit" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Отправляем…' : 'Записаться на диагностику'}
                        </button>
                        <button type="button" className="modal-back" onClick={() => setStep('choice')}>
                            ← Назад
                        </button>
                    </form>
                </section>

                {/* STEP 3 — success */}
                <section className={`modal-step${step === 'success' ? ' active' : ''}`}>
                    <div className="modal-success">
                        <div className="modal-success-mark">✓</div>
                        <h2 className="modal-title">
                            Спасибо!
                            <br />
                            <em>Скоро свяжемся.</em>
                        </h2>
                        <p className="modal-desc">
                            Куратор напишет в ближайшее время, чтобы согласовать удобный слот. Хорошего дня.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};
