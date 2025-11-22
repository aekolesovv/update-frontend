import Popup from '@/components/Popup/Popup';
import SEO from '@/components/SEO/SEO';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomButton } from '../../components/custom_components/CustomButton/CustomButton';
import CustomInput from '../../components/custom_components/CustomInput/CustomInput';
import { PASSWORD_VALIDATION_CONFIG } from '../../constants/validation';
import { changePassword, selectUser } from '../../services/redux/slices/user/user';
import { useAppDispatch, useAppSelector } from '../../services/typeHooks';
import { IChangePassword } from '../../types/Auth.types';
import { CustomInputTypes } from '../../types/CustomInput.types';
import styles from './style.module.scss';

const ChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);
    const [isErrorPopupOpened, setIsErrorPopupOpened] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isDirty, isValid },
    } = useForm<IChangePassword>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<IChangePassword> = formData => {
        dispatch(
            changePassword({
                data: {
                    userId: user.id,
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                },
                token: user.token,
            })
        )
            .unwrap()
            .then(res => {
                setIsSavedPopupOpened(true);
            })
            .catch(err => {
                setIsErrorPopupOpened(true);
                console.log('dispatch changePassword err:', err);
            });
    };

    useEffect(() => {
        reset();
        setIsSavedPopupOpened(false);
    }, [reset]);

    return (
        <>
            <SEO
                title="Смена пароля - BAYAR"
                description="Измените свой пароль для безопасного доступа к вашей учетной записи Beancode."
                keywords="смена пароля, безопасность, учетная запись, BAYAR"
            />

            <div className={styles.signup}>
                <div className={styles.signup__container}>
                    <h1 className={styles.signup__title}>Смена пароля</h1>
                    <form
                        className={styles.signup__form}
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <CustomInput
                            inputType={CustomInputTypes.newPassword}
                            labelText={'Старый пароль'}
                            showPasswordButton={true}
                            validation={{
                                ...register('oldPassword', PASSWORD_VALIDATION_CONFIG),
                            }}
                            error={errors?.oldPassword?.message}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setValue('oldPassword', e.target.value)
                            }
                        />
                        <CustomInput
                            inputType={CustomInputTypes.oldPassword}
                            labelText={'Новый пароль'}
                            showPasswordButton={true}
                            validation={{
                                ...register('newPassword', PASSWORD_VALIDATION_CONFIG),
                            }}
                            error={errors?.newPassword?.message}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setValue('newPassword', e.target.value)
                            }
                        />
                        <CustomButton
                            buttonText={'Сменить пароль'}
                            handleButtonClick={handleSubmit(onSubmit)}
                            type="button"
                        />
                    </form>
                </div>
                <Popup
                    title="Смена пароля"
                    text="Пароль успешно изменен"
                    link="catalog"
                    isOpened={isSavedPopupOpened}
                    setIsOpened={setIsSavedPopupOpened}
                />
                <Popup
                    title="Ошибка"
                    text="Вы ввели неверный пароль"
                    link="recover-password"
                    isOpened={isErrorPopupOpened}
                    setIsOpened={setIsErrorPopupOpened}
                />
            </div>
        </>
    );
};

export default ChangePasswordPage;
