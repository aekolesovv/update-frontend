import SEO from '@/components/SEO/SEO';
import { useAppDispatch, useAppSelector } from '@/services/typeHooks';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import CustomInput from '@/components/custom_components/CustomInput/CustomInput';
import {
    EMAIL_VALIDATION_CONFIG,
    SUBJECT_VALIDATION_CONFIG,
    EMAIL_TEXT_VALIDATION_CONFIG,
} from '@/constants/validation';
import { CustomInputTypes } from '@/types/CustomInput.types';
import { IData } from '@/types/Mailer.types';
import { sendEmailApi } from '@/services/redux/slices/mailer/mailer';
import styles from './index.module.scss';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.email || { status: 'idle', error: '' });
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<IData>({ mode: 'onChange' });

    const formData = watch();

    useEffect(() => {
        console.log('=== FORM DATA ===');
        console.log('Email:', formData.email);
        console.log('Subject:', formData.subject);
        console.log('Text:', formData.text);
        console.log('All data:', formData);
        console.log('Errors:', errors);
        console.log('================');
    }, [formData, errors]);

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
        <>
            <SEO
                title="Сэндвич-панели - BAYAR"
                description="Завод изготовитель сэндвич-панелей по лучшим ценам в РФ"
                keywords="сэндвич-панели, сэндвич панели купить, панели для строительства, строительные материалы, утепленные панели, Челны, Россия"
            />

            <div className={styles.main}>
                <div className={styles.container}>
                    <h1>Test UpdateYou World</h1>
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
                </div>
            </div>
        </>
    );
};

export default MainPage;
