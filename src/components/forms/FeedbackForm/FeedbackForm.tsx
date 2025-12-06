import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import { IData } from '@/types/Mailer.types';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomInputTypes } from '@/types/CustomInput.types';
import { sendEmail, EmailStatus } from '@/utils/sendEmail';
import styles from './style.module.scss';
import CustomInput from '@/components/custom_components/CustomInput/CustomInput';
import { EMAIL_VALIDATION_CONFIG, SUBJECT_VALIDATION_CONFIG, EMAIL_TEXT_VALIDATION_CONFIG } from '@/constants/validation';

export default function FeedbackForm() {
    const [status, setStatus] = useState<EmailStatus>('idle');
    const [error, setError] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IData>({ mode: 'onChange' });

    useEffect(() => {
        if (status === 'success') {
            setIsSuccess(true);
            reset();
            setTimeout(() => {
                setIsSuccess(false);
                setStatus('idle');
            }, 3000);
        }
    }, [status, reset]);

    const onSubmit: SubmitHandler<IData> = async data => {
        setStatus('loading');
        setError('');
        
        const result = await sendEmail(data);
        
        if (result.success) {
            setStatus('success');
        } else {
            setStatus('error');
            setError(result.error || 'Ошибка при отправке письма');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2 className={styles.form__title}>Отправить письмо</h2>
            <CustomInput
                inputType={CustomInputTypes.email}
                labelText="Email"
                validation={{
                    ...register('email', EMAIL_VALIDATION_CONFIG),
                }}
                placeholder="user@example.com"
                error={errors?.email?.message}
            />
            <CustomInput
                inputType={CustomInputTypes.subject}
                labelText="Тема письма"
                validation={{
                    ...register('subject', SUBJECT_VALIDATION_CONFIG),
                }}
                placeholder="Тема письма"
                error={errors?.subject?.message}
            />
            <CustomInput
                inputType={CustomInputTypes.text}
                labelText="Текст письма"
                validation={{
                    ...register('text', EMAIL_TEXT_VALIDATION_CONFIG),
                }}
                placeholder="Введите текст письма"
                error={errors?.text?.message}
            />
            {isSuccess && (
                <div className={styles.form__success}>Письмо успешно отправлено!</div>
            )}
            {error && <div className={styles.form__error}>Ошибка: {error}</div>}
            <CustomButton
                buttonText={status === 'loading' ? 'Отправка...' : 'Отправить'}
                type="submit"
                disabled={status === 'loading'}
            />
        </form>
    );
}
