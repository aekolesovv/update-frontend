import { FC } from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import { TariffCard, TariffCardProps } from '@/components/custom_components/TariffCard/TariffCard';


export const Start: FC = () => {
    const router = useRouter();

    const tariffData: TariffCardProps[] = [
        {
            title: 'Основной курс + дайджест',
            features: 'Получите полный доступ\nк основному курсу\nи дайджесту - прокачивайтесь\n быстрее, глубже и увереннее.',
            price: '6888 рублей',
            button: (
                <CustomButton
                    buttonText="Подписаться"
                    type="button"
                    showCursor={true}
                    handleButtonClick={() => router.push('/in-progress')}
                />
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.content_wrapper}>
                <h2 className={styles.title}>Готовы прокачать себя и свой английский<br /> на максимум?</h2>
                {tariffData.map((tariff, index) => (
                    <TariffCard
                        key={index}
                        title={tariff.title}
                        tag={tariff.tag}
                        features={tariff.features}
                        price={tariff.price}
                        button={tariff.button}
                    />
                ))}
                <div className={styles.buttons}>
                    <CustomButton
                        buttonText="Начать обучение"
                        showArrow
                        type="button"
                        className={styles.button}
                        handleButtonClick={() => router.push('/in-progress')}
                    />
                    <CustomButton
                        buttonText="Бесплатный демо-урок"
                        type="button"
                        className={styles.button}
                        handleButtonClick={() => router.push('/in-progress')}
                    />
                </div>
            </div>
        </div>
    );
};
