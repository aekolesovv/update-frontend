import Popup from '@/components/Popup/Popup';
import SEO from '@/components/SEO/SEO';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomButton } from '../../components/custom_components/CustomButton/CustomButton';
import CustomInput from '../../components/custom_components/CustomInput/CustomInput';
import { EMAIL_VALIDATION_CONFIG } from '../../constants/validation';
import { recoverPassword } from '../../services/redux/slices/user/user';
import { useAppDispatch } from '../../services/typeHooks';
import { IRecoverPassword } from '../../types/Auth.types';
import { CustomInputTypes } from '../../types/CustomInput.types';
import styles from './style.module.scss';

const RecoverPasswordPage = () => {
    const dispatch = useAppDispatch();

    const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);
    const [isErrorPopupOpened, setIsErrorPopupOpened] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
        getValues,
    } = useForm<IRecoverPassword>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<IRecoverPassword> = () => {
        dispatch(
            recoverPassword({
                // TODO письмо приходит 2 раза
                email: getValues('email'),
            })
        )
            .unwrap()
            .then(res => {
                setIsSavedPopupOpened(true);
            })
            .catch(err => {
                setIsErrorPopupOpened(true);
                console.log('dispatch signInUser err:', err);
            });
    };

    useEffect(() => {
        setIsSavedPopupOpened(false);
    }, []);

    return (
        <>
            <SEO
                title="Восстановление пароля - BAYAR"
                description="Страница восстановления пароля на BAYAR. Введите вашу электронную почту, чтобы получить инструкции по сбросу пароля."
                keywords="восстановление пароля, сброс пароля, восстановить доступ, BAYAR"
            />

            <div className={styles.signup}>
                <div className={styles.signup__container}>
                    <h1 className={styles.signup__title}>Восстановление пароля</h1>
                    <form
                        className={styles.signup__form}
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <CustomInput
                            inputType={CustomInputTypes.email}
                            labelText="Электронная почта"
                            validation={{
                                ...register('email', EMAIL_VALIDATION_CONFIG),
                            }}
                            error={errors?.email?.message}
                            // maxLength={VALIDATION_SETTINGS.email.maxLength}
                        />
                        <CustomButton
                            buttonText={'Отправить'}
                            handleButtonClick={handleSubmit(onSubmit)}
                            disabled={!isDirty || !isValid}
                            type="button"
                        />
                    </form>
                </div>
                <Popup
                    title="Восстановление пароля"
                    text="Письмо отправлено на указанную почту"
                    link="/"
                    isOpened={isSavedPopupOpened}
                    setIsOpened={setIsSavedPopupOpened}
                />
                <Popup
                    title="Ошибка"
                    text="Вы ввели неверную почту"
                    isOpened={isErrorPopupOpened}
                    setIsOpened={setIsErrorPopupOpened}
                />
            </div>
        </>
    );
};

export default RecoverPasswordPage;
