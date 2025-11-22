import Popup from '@/components/Popup/Popup';
import SEO from '@/components/SEO/SEO';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomButton } from '../../components/custom_components/CustomButton/CustomButton';
import CustomInput from '../../components/custom_components/CustomInput/CustomInput';
import { PASSWORD_VALIDATION_CONFIG } from '../../constants/validation';
import { resetPassword, selectUser } from '../../services/redux/slices/user/user';
import { useAppDispatch, useAppSelector } from '../../services/typeHooks';
import { IResetPassword } from '../../types/Auth.types';
import { CustomInputTypes } from '../../types/CustomInput.types';
import styles from './style.module.scss';

const ResetPasswordPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const [authError, setAuthError] = useState(false);
    const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);
    const [isErrorPopupOpened, setIsErrorPopupOpened] = useState<boolean>(false);

    const { query } = useRouter();

    const token = query.token as string;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
        getValues,
    } = useForm<IResetPassword>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<IResetPassword> = () => {
        dispatch(
            resetPassword({
                token: token ? token : '',
                newPassword: getValues('newPassword'),
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
        reset();
        setAuthError(false);
    }, [reset]);

    useEffect(() => {
        setIsSavedPopupOpened(false);
    }, []);

    return (
        <>
            <SEO
                title="Сброс пароля - BAYAR"
                description="Страница сброса пароля на BAYAR. Введите новый пароль для восстановления доступа к вашему аккаунту."
                keywords="сброс пароля, восстановление пароля, смена пароля, BAYAR"
            />

            <div className={styles.signup}>
                <div className={styles.signup__container}>
                    <h1 className={styles.signup__title}>Введите новый пароль</h1>
                    <form
                        className={styles.signup__form}
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <CustomInput
                            inputType={CustomInputTypes.newPassword}
                            labelText="Новый пароль"
                            showPasswordButton={true}
                            validation={{
                                ...register('newPassword', PASSWORD_VALIDATION_CONFIG),
                            }}
                            error={errors?.newPassword?.message}
                        />
                        <CustomButton
                            buttonText={'Сменить пароль'}
                            handleButtonClick={handleSubmit(onSubmit)}
                            disabled={!isDirty || !isValid}
                            type="button"
                        />
                    </form>
                </div>
                <Popup
                    title="Восстановление пароля"
                    text="Вы успешно изменили пароль"
                    link="/"
                    isOpened={isSavedPopupOpened}
                    setIsOpened={setIsSavedPopupOpened}
                />
                <Popup
                    title="Ошибка"
                    text="Вы ввели неверную почту или пароль" // TODO можеть быть сюда добавить ошибку что не хватает токена???
                    isOpened={isErrorPopupOpened}
                    setIsOpened={setIsErrorPopupOpened}
                />
            </div>
        </>
    );
};

export default ResetPasswordPage;
