import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { sendEmail, EmailStatus } from '@/utils/sendEmail';
import styles from './style.module.scss';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import CustomInput from '@/components/custom_components/CustomInput/CustomInput';
import { CustomInputTypes } from '@/types/CustomInput.types';
import { NAME_VALIDATION_CONFIG, EMAIL_VALIDATION_CONFIG, PHONE_VALIDATION_CONFIG, EMAIL_TEXT_VALIDATION_CONFIG } from '@/constants/validation';
import { Window } from '@/components/Window/Window';

interface IQuestionsFormData {
    name: string;
    email: string;
    phone: string;
    question: string;
}

// TODO поправить высоту при ошибках в инпуте
export const QuestionsForm: FC = () => {
    const [status, setStatus] = useState<EmailStatus>('idle');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IQuestionsFormData>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<IQuestionsFormData> = async data => {
        setStatus('loading');

        const result = await sendEmail({
            email: data.email,
            subject: `Вопрос от ${data.name}`,
            text: `Имя: ${data.name}\nТелефон: ${data.phone}\nВопрос: ${data.question}`,
            greetings: '',
        });

        if (result.success) {
            setStatus('success');
            reset();
        } else {
            setStatus('error');
        }
    };

    return (
        <div className={styles.container} id="support">
            <div className={styles.formWrapper}>
                <Window width={1170} height="auto" mWidth={320} mHeight="auto" hideHeader>
                    <div className={styles.formContent}>
                        <div className={styles.contentLeft}>
                            <h2 className={styles.title}>Есть вопрос?</h2>
                            <p className={styles.description}>
                                Поделитесь им с нами,<br />
                                мы свяжемся с вами в ближайшее время!
                            </p>
                        </div>
                        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className={styles.formFields}>
                                <CustomInput
                                    inputType={CustomInputTypes.name}
                                    labelText="Ваше имя"
                                    validation={{
                                        ...register('name', NAME_VALIDATION_CONFIG),
                                    }}
                                    placeholder="Ваше имя"
                                    error={errors?.name?.message}
                                />
                                <CustomInput
                                    inputType={CustomInputTypes.email}
                                    labelText="Электронная почта"
                                    validation={{
                                        ...register('email', EMAIL_VALIDATION_CONFIG),
                                    }}
                                    placeholder="Электронная почта"
                                    error={errors?.email?.message}
                                />
                                <CustomInput
                                    inputType={CustomInputTypes.phone}
                                    labelText="Номер телефона"
                                    validation={{
                                        ...register('phone', PHONE_VALIDATION_CONFIG),
                                    }}
                                    placeholder="Номер телефона"
                                    error={errors?.phone?.message}
                                />
                                <div className={styles.textareaWrapper}>
                                    <div className={styles.input__wrapper}>
                                        <textarea
                                            {...register('question', EMAIL_TEXT_VALIDATION_CONFIG)}
                                            className={`${styles.textarea} ${errors?.question ? styles.input__field_invalid : ''}`}
                                            id="question"
                                            name="question"
                                            placeholder="Ваш вопрос"
                                            rows={6}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.buttonWrapper}>
                                <CustomButton
                                    buttonText={status === 'loading' ? 'Отправка...' : 'Отправить'}
                                    type="submit"
                                    disabled={status === 'loading'}
                                    showArrow
                                />
                            </div>
                            {status === 'success' && (
                                <div className={styles.form__success}>Спасибо! Ваш вопрос отправлен.</div>
                            )}
                            {status === 'error' && (
                                <div className={styles.form__error}>Ошибка при отправке. Попробуйте еще раз.</div>
                            )}
                        </form>
                    </div>
                </Window>
            </div>
        </div>
    );
};

