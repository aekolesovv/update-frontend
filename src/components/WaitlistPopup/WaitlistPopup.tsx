import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { sendEmail, EmailStatus } from '@/utils/sendEmail';
import Popup from '@/components/Popup/Popup';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import CustomInput from '@/components/custom_components/CustomInput/CustomInput';
import { CustomInputTypes } from '@/types/CustomInput.types';
import { NAME_VALIDATION_CONFIG, EMAIL_VALIDATION_CONFIG, TELEGRAM_VALIDATION_CONFIG } from '@/constants/validation';
import styles from './WaitlistPopup.module.scss';

interface IWaitlistFormData {
    name: string;
    telegram: string;
    email: string;
}

interface WaitlistPopupProps {
    isOpened: boolean;
    setIsOpened: (value: boolean) => void;
    courseTitle?: string;
}

export const WaitlistPopup: FC<WaitlistPopupProps> = ({ isOpened, setIsOpened, courseTitle }) => {
    const [status, setStatus] = useState<EmailStatus>('idle');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IWaitlistFormData>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<IWaitlistFormData> = async data => {
        setStatus('loading');

        const courseName = courseTitle || 'курса';
        const telegramNick = data.telegram.startsWith('@') ? data.telegram : `@${data.telegram}`;
        const result = await sendEmail({
            email: data.email,
            subject: `Запись в лист ожидания: ${courseName}`,
            text: `Имя: ${data.name}\nTelegram: ${telegramNick}\nEmail: ${data.email}\nКурс: ${courseName}`,
            greetings: '',
        });

        if (result.success) {
            setStatus('success');
            reset();
            setTimeout(() => {
                setIsOpened(false);
                setStatus('idle');
            }, 2000);
        } else {
            setStatus('error');
        }
    };

    return (
        <Popup
            isOpened={isOpened}
            setIsOpened={setIsOpened}
            style={{ position: 'relative' }}
        >
            <div className={styles.popupFormContent}>
                <form className={styles.waitlistForm} onSubmit={handleSubmit(onSubmit)} noValidate>
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
                            inputType={CustomInputTypes.telegram}
                            labelText="Ник в telegram"
                            validation={{
                                ...register('telegram', TELEGRAM_VALIDATION_CONFIG),
                            }}
                            placeholder="@username"
                            error={errors?.telegram?.message}
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
                    </div>
                    <div className={styles.formButtonWrapper}>
                        <CustomButton
                            buttonText={status === 'loading' ? 'Отправка...' : 'Отправить'}
                            type="submit"
                            disabled={status === 'loading'}
                            showArrow
                        />
                    </div>
                    {status === 'success' && (
                        <div className={styles.form__success}>Спасибо! Мы сообщим вам о старте.</div>
                    )}
                    {status === 'error' && (
                        <div className={styles.form__error}>Ошибка при отправке. Попробуйте еще раз.</div>
                    )}
                </form>
            </div>
        </Popup>
    );
};


