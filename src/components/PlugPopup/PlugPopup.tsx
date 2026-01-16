import Popup from '@/components/Popup/Popup';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import CustomInput from '@/components/custom_components/CustomInput/CustomInput';
import { ReCaptcha } from '@/components/custom_components/ReCaptcha/ReCaptcha';
import { EMAIL_VALIDATION_CONFIG, PHONE_VALIDATION_CONFIG, TELEGRAM_VALIDATION_CONFIG } from '@/constants/validation';
import { CustomInputTypes } from '@/types/CustomInput.types';
import { EmailStatus, sendEmail } from '@/utils/sendEmail';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './PlugPopup.module.scss';

type ContactType = 'telegram' | 'phone' | 'email';

interface IPlugFormData {
    contactType: ContactType;
    contact: string;
}

interface PlugPopupProps {
    isOpened: boolean;
    setIsOpened: (value: boolean) => void;
    title: string;
}

export const PlugPopup: FC<PlugPopupProps> = ({ isOpened, setIsOpened, title }) => {
    const [status, setStatus] = useState<EmailStatus>('idle');
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IPlugFormData>({
        mode: 'onChange',
        defaultValues: {
            contactType: 'telegram',
            contact: '',
        }
    });

    const selectedContactType = watch('contactType');

    useEffect(() => {
        setValue('contact', '');
    }, [selectedContactType, setValue]);

    const getValidationConfig = () => {
        switch (selectedContactType) {
            case 'telegram':
                return TELEGRAM_VALIDATION_CONFIG;
            case 'phone':
                return PHONE_VALIDATION_CONFIG;
            case 'email':
                return EMAIL_VALIDATION_CONFIG;
            default:
                return TELEGRAM_VALIDATION_CONFIG;
        }
    };

    const getInputType = (): CustomInputTypes => {
        switch (selectedContactType) {
            case 'telegram':
                return CustomInputTypes.telegram;
            case 'phone':
                return CustomInputTypes.phone;
            case 'email':
                return CustomInputTypes.email;
            default:
                return CustomInputTypes.telegram;
        }
    };

    const getLabelText = (): string => {
        switch (selectedContactType) {
            case 'telegram':
                return 'Ник в telegram';
            case 'phone':
                return 'Номер телефона';
            case 'email':
                return 'Электронная почта';
            default:
                return 'Ник в telegram';
        }
    };

    const getPlaceholder = (): string => {
        switch (selectedContactType) {
            case 'telegram':
                return '@username - имя пользователя в telegram';
            case 'phone':
                return '+7 (999) 999-99-99';
            case 'email':
                return 'Электронная почта';
            default:
                return '@username - имя пользователя в telegram';
        }
    };

    const formatContact = (type: ContactType, value: string): string => {
        if (type === 'telegram') {
            return value.startsWith('@') ? value : `@${value}`;
        }
        return value;
    };

    const onSubmit: SubmitHandler<IPlugFormData> = async data => {
        if (!recaptchaToken) {
            setError('Пожалуйста, подтвердите, что вы не робот');
            return;
        }

        setStatus('loading');
        setError('');

        const formattedContact = formatContact(data.contactType, data.contact);
        const contactLabel = data.contactType === 'telegram' ? 'Telegram' :
            data.contactType === 'phone' ? 'Телефон' : 'Email';

        const result = await sendEmail({
            email: data.contactType === 'email' ? data.contact : '',
            subject: `${title}`,
            text: `Тип контакта: ${contactLabel}\nКонтакты: ${formattedContact}\nЗапрос: ${title}`,
            greetings: '',
            recaptchaToken,
        });

        if (result.success) {
            setStatus('success');
            reset();
            setRecaptchaToken(null);
            setTimeout(() => {
                setIsOpened(false);
                setStatus('idle');
            }, 2000);
        } else {
            setStatus('error');
            setError(result.error || 'Ошибка при отправке');
            setRecaptchaToken(null);
        }
    };

    return (
        <Popup
            isOpened={isOpened}
            setIsOpened={setIsOpened}
            style={{ position: 'relative' }}
        >
            <div className={styles.popupFormContent}>
                <form className={styles.PlugForm} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <h3 className={styles.formTitle}>{title}</h3>
                    <div className={styles.formFields}>
                        <div className={styles.contactTypeWrapper}>
                            <label className={styles.contactTypeLabel}>Как с вами связаться?</label>
                            <select
                                className={styles.contactTypeSelect}
                                {...register('contactType')}
                            >
                                <option value="telegram">Telegram</option>
                                <option value="phone">Телефон</option>
                                <option value="email">Email</option>
                            </select>
                        </div>
                        <CustomInput
                            key={selectedContactType}
                            inputType={getInputType()}
                            labelText={getLabelText()}
                            validation={{
                                ...register('contact', getValidationConfig()),
                            }}
                            placeholder={getPlaceholder()}
                            error={errors?.contact?.message}
                        />
                    </div>
                    <ReCaptcha onChange={setRecaptchaToken} />
                    <div className={styles.formButtonWrapper}>
                        <CustomButton
                            buttonText={status === 'loading' ? 'Отправка...' : 'Отправить'}
                            type="submit"
                            disabled={status === 'loading' || !recaptchaToken}
                            showArrow
                        />
                    </div>
                    {status === 'success' && (
                        <div className={styles.form__success}>Спасибо! Мы свяжемся с вами в ближайшее время.</div>
                    )}
                    {(status === 'error' || error) && (
                        <div className={styles.form__error}>{error || 'Ошибка при отправке. Попробуйте еще раз.'}</div>
                    )}
                </form>
            </div>
        </Popup>
    );
};

