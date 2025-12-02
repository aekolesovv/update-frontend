import { FC } from 'react';
import styles from './style.module.scss';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import { TariffCard, TariffCardProps } from '@/components/custom_components/TariffCard/TariffCard';


const tariffData: TariffCardProps[] = [
    {
        title: 'Основной курс + дайджест',
        tag: 'самостоятельный',
        features: 'Получите полный доступ\nк основному курсу\n\nи дайджесту - прокачивайтесь\n\n быстрее, глубже и увереннее.',
        price: '6888 рублей',
        button: (
            <CustomButton
                buttonText="I'm a pro player"
                type="button"
                showCursor={true}
            />
        ),
    },
    {
        title: 'Self-growth',
        tag: 'самостоятельный',
        features: 'Доступ ко всем видеоурокам\n\nЗаданиям на закрепление\nс автопроверкой\n\nЛичный трекер прогресса\n\nЕжемесячный challenge\n\nДоступ к материалам\n— на весь срок подписки',
        price: '5000 рублей',
        button: (
            <CustomButton
                buttonText="Записаться"
                type="button"
                showCursor={true}
            />
        ),
    },
];

export const Start: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.cards_wrapper}>
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
            </div>
        </div>
    );
};
