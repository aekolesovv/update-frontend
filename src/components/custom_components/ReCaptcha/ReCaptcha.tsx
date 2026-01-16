import { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
    onChange: (token: string | null) => void;
    onError?: () => void;
}

export const ReCaptcha: React.FC<ReCaptchaProps> = ({ onChange, onError }) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    
    // Получаем ключ сайта из переменной окружения или используем тестовый ключ
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // тестовый ключ Google

    // Логирование для отладки (только в dev режиме)
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('reCAPTCHA Site Key:', siteKey);
            console.log('NEXT_PUBLIC_RECAPTCHA_SITE_KEY from env:', process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
        }
    }, [siteKey]);

    const handleChange = (token: string | null) => {
        onChange(token);
    };

    const handleError = (error?: any) => {
        console.error('reCAPTCHA error:', error);
        if (onError) {
            onError();
        }
    };

    // Сброс капчи при размонтировании
    useEffect(() => {
        return () => {
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
        };
    }, []);

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
