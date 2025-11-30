import Image from 'next/image';
import { FC, ReactNode } from 'react';
import styles from './style.module.scss';
import computerImage from '../../../images/components/computer.svg';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';

interface TariffCardData {
    title: string;
    tag: string;
    features: string;
    price: string;
    button: ReactNode;
}

const tariffData: TariffCardData[] = [
    {
        title: 'Self-growth',
        tag: 'самостоятельный',
        features: 'Доступ ко всем видеоурокам\n\nЗаданиям на закрепление\nс автопроверкой\n\nЛичный трекер прогресса\n\nЕжемесячный challenge\n\nДоступ к материалам\n— на весь срок подписки',
        price: '5000 рублей',
        button: (
            <CustomButton
                buttonText="Записаться"
                type="button"
                showArrow={true}
                showCursor={true}
            />
        ),
    },
    {
        title: 'Guided Growth',
        tag: 'practice, feedback, community support',
        features: 'Все преимущества Self-Growth\nтарифа + cherry on top\n\nSpeaking Clubs с преподавателем\n\nЗадания на speaking & writing\nс проверкой преподавателя\n\nПерсональная поддержка\n\nДоступ к материалам — навсегда',
        price: '9000 рублей',
        button: (
            <CustomButton
                buttonText="Записаться"
                type="button"
                showArrow={true}
            />
        ),
    },
];

export const Tariffs: FC = () => {
    return (
        <div className={styles.container} id="tariffs">
            <h2 className={styles.title}>ТАРИФЫ</h2>

            <div className={styles.cards_wrapper}>
                {tariffData.map((tariff, index) => (
                    <div
                        key={index}
                        className={styles.card}
                    >
                        <Image
                            src={computerImage}
                            alt="Computer illustration"
                            className={styles.computer_image}
                            fill
                        />

                        <div className={styles.card_content}>
                            <h3 className={styles.card_title}>{tariff.title}</h3>
                            <span className={styles.card_tag}>{tariff.tag}</span>
                            <p className={styles.card_features}>
                                {tariff.features.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < tariff.features.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                            <div className={styles.card_price}>{tariff.price}</div>
                            {tariff.button}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.demo_button_wrapper}>
                <CustomButton
                    buttonText="Бесплатный демо-урок"
                    type="button"
                />
            </div>
        </div>
    );
};
