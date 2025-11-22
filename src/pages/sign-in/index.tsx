import Popup from '@/components/Popup/Popup';
import SEO from '@/components/SEO/SEO';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomButton } from '../../components/custom_components/CustomButton/CustomButton';
import CustomInput from '../../components/custom_components/CustomInput/CustomInput';
import { EMAIL_VALIDATION_CONFIG, PASSWORD_VALIDATION_CONFIG } from '../../constants/validation';
import { getUserInfo, setUser, signInUser } from '../../services/redux/slices/user/user';
import { useAppDispatch } from '../../services/typeHooks';
import { ISignInData } from '../../types/Auth.types';
import { CustomInputTypes } from '../../types/CustomInput.types';
import styles from './style.module.scss';

const SignInPage = () => {
    const dispatch = useAppDispatch();

    const [authError, setAuthError] = useState(false);
    const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);
    const [isErrorPopupOpened, setIsErrorPopupOpened] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
        getValues,
    } = useForm<ISignInData>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<ISignInData> = () => {
        const formValues = getValues();

        dispatch(signInUser(formValues as ISignInData))
            .unwrap()
            .then(res => {
                dispatch(setUser({ email: formValues.email, token: res }));
                return res;
            })
            .then(res => {
                dispatch(getUserInfo(res));
                setIsSavedPopupOpened(true);
            })
            .catch(err => {
                setIsErrorPopupOpened(true);
                console.log('dispatch signInUser err:', err);
            });
    };

    useEffect(() => {
        reset();
        setAuthError(false);
    }, [reset]);

    useEffect(() => {
        setIsSavedPopupOpened(false);
    }, []);

    return (
        <>
            <SEO
                title="Вход в личный кабинет - BAYAR"
                description="Введите свои данные для доступа в личный кабинет. Если у вас нет аккаунта, вы можете зарегистрироваться здесь."
                keywords="личный кабинет, войти, вход, bayar"
            />

            <div className={styles.signup}>
                <div className={styles.signup__container}>
                    <h1 className={styles.signup__title}>Вход в личный кабинет</h1>
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
                        />
                        <CustomInput
                            inputType={CustomInputTypes.password}
                            labelText="Пароль"
                            showPasswordButton={true}
                            validation={{ ...register('password', PASSWORD_VALIDATION_CONFIG) }}
                            error={errors?.password?.message}
                        />
                        <Link
                            href="/recover-password"
                            className={`${styles.auth__link} ${styles.auth__recover_link}`}
                        >
                            Забыли пароль?
                        </Link>
                        <CustomButton
                            buttonText={'Войти'}
                            handleButtonClick={handleSubmit(onSubmit)}
                            disabled={!isDirty || !isValid}
                            type="button"
                        />
                        <Link href="/sign-up" className={styles.signup__link}>
                            Зарегистрироваться
                        </Link>
                    </form>
                </div>
                <Popup
                    title="Авторизация"
                    text="Вы успешно зашли в личный аккаунт"
                    link="/"
                    isOpened={isSavedPopupOpened}
                    setIsOpened={setIsSavedPopupOpened}
                />
                <Popup
                    title="Ошибка"
                    text="Вы ввели неверную почту или пароль"
                    isOpened={isErrorPopupOpened}
                    setIsOpened={setIsErrorPopupOpened}
                />
            </div>
        </>
    );
};

export default SignInPage;
