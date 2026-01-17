import { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
    onChange: (token: string | null) => void;
    onError?: () => void;
}

export const ReCaptcha: React.FC<ReCaptchaProps> = ({ onChange, onError }) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    // Логирование для отладки (только в dev режиме)
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('reCAPTCHA v2 Site Key:', siteKey);

            if (!siteKey) {
                console.warn('⚠️ NEXT_PUBLIC_RECAPTCHA_SITE_KEY не установлен!');
            }
        }
    }, [siteKey]);

    const handleChange = (token: string | null) => {
        onChange(token);
    };

    const handleError = () => {
        console.error('⚠️ reCAPTCHA v2 error: Invalid site key или домен не добавлен в Google Console');
        console.error('Проверьте:');
        console.error('1. Домен (localhost, 127.0.0.1) добавлен в Google reCAPTCHA Console');
        console.error('2. Используется правильная версия reCAPTCHA (v2 Checkbox)');
        console.error('3. Site Key правильный:', siteKey);

        if (onError) {
            onError();
        }
    };

    // Сброс капчи при размонтировании
    useEffect(() => {
        const currentRef = recaptchaRef.current;
        return () => {
            if (currentRef) {
                currentRef.reset();
            }
        };
    }, []);

    if (!siteKey) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0', color: 'red' }}>
                Ошибка: NEXT_PUBLIC_RECAPTCHA_SITE_KEY не установлен
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey}
                onChange={handleChange}
                onErrored={handleError}
                onExpired={() => onChange(null)}
                size="normal"
            />
        </div>
    );
};
