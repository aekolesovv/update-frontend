import Image from 'next/image';
import { FC, ReactNode } from 'react';
import styles from './style.module.scss';
import computerImage from '../../../images/components/computer.svg';
import cherryImage from '../../../images/logo/cherry.svg';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import { Tag } from '@/components/Tag/Tag';

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
                                {tariff.features.split('\n').map((line, i, lines) => {
                                    const isLastLine = i === lines.length - 1;
                                    const hasCherry = line.includes('cherry on top');

                                    if (hasCherry) {
                                        const parts = line.split('cherry on top');
                                        return (
                                            <span key={i}>
                                                {parts[0]}
                                                cherry on top{' '}
                                                <Image
                                                    src={cherryImage}
                                                    alt=""
                                                    width={20}
                                                    height={20}
                                                    style={{ display: 'inline-block', verticalAlign: 'middle' }}
                                                />
                                                {parts[1]}
                                                {!isLastLine && <br />}
                                            </span>
                                        );
                                    }

                                    return (
                                        <span key={i}>
                                            {line}
                                            {!isLastLine && <br />}
                                        </span>
                                    );
                                })}
                            </p>
                            <div className={styles.card_price}>{tariff.price}</div>
                            {tariff.button}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.tag_wrapper}>
                <Tag
                    text={`подходит тем, кто хочет\nвыводить новые знания в речь`}
                    width={365}
                    height={150}
                    mWidth={242}
                    mHeight={60}
                />
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
