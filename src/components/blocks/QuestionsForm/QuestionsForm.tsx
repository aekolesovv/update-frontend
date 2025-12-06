import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/services/redux/store';
import { useAppSelector } from '@/services/typeHooks';
import { sendEmailApi } from '@/services/redux/slices/mailer/mailer';
import styles from './style.module.scss';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import CustomInput from '@/components/custom_components/CustomInput/CustomInput';
import { CustomInputTypes } from '@/types/CustomInput.types';
import { NAME_VALIDATION_CONFIG, EMAIL_VALIDATION_CONFIG, PHONE_VALIDATION_CONFIG, EMAIL_TEXT_VALIDATION_CONFIG } from '@/constants/validation';

interface IQuestionsFormData {
    name: string;
    email: string;
    phone: string;
    question: string;
}

// TODO поправить высоту при ошибках в инпуте
export const QuestionsForm: FC = () => {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.email || { status: 'idle', error: '' });
    // const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IQuestionsFormData>({ mode: 'onChange' });

    useEffect(() => {
        if (status === 'success') {
            // setIsSuccess(true);
            reset();
            // setTimeout(() => {
            //     setIsSuccess(false);
            // }, 3000);
        }
    }, [status, reset]);

    const onSubmit: SubmitHandler<IQuestionsFormData> = async data => {
        await dispatch(sendEmailApi({
            email: data.email,
            subject: `Вопрос от ${data.name}`,
            text: `Имя: ${data.name}\nТелефон: ${data.phone}\nВопрос: ${data.question}`,
            greetings: '',
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
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
                </form>
            </div>
        </div>
    );
};

