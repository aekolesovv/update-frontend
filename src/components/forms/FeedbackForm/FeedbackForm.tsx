import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import { useAppDispatch } from '@/services/redux/store';
import { useAppSelector } from '@/services/typeHooks';
import { useEffect } from 'react';
import { IData } from '@/types/Mailer.types';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomInputTypes } from '@/types/CustomInput.types';
import { sendEmailApi } from '@/services/redux/slices/mailer/mailer';
import styles from './style.module.scss';
import CustomInput from '@/components/custom_components/CustomInput/CustomInput';
import { EMAIL_VALIDATION_CONFIG, SUBJECT_VALIDATION_CONFIG, EMAIL_TEXT_VALIDATION_CONFIG } from '@/constants/validation';

export default function FeedbackForm() {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.email || { status: 'idle', error: '' });
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
            }, 3000);
        }
    }, [status, reset]);

    const onSubmit: SubmitHandler<IData> = async data => {
        await dispatch(sendEmailApi(data));
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
