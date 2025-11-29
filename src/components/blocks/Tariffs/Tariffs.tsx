import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';
import computer1Image from '../../../images/components/computer.svg';
import computer2Image from '../../../images/components/computer-2.svg';
import commentImage from '../../../images/components/comment-image-45d565.png';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';

export const Tariffs: FC = () => {
    return (
        <div className={styles.container} id="tariffs">
            <h2 className={styles.title}>ТАРИФЫ</h2>

            <div className={styles.cards_wrapper}>
                {/* Левая карточка - Self-growth */}
                <div className={styles.card}>
                    <div className={styles.card_header}>
                        <CustomButton
                            buttonText="Записаться"
                            type="button"
                            className={styles.card_header_button}
                            showCursor={true}
                        />
                        <span className={styles.card_header_tag}>самостоятельный</span>
                    </div>

                    <div className={styles.card_content}>
                        <Image
                            src={computer2Image}
                            alt="Computer illustration"
                            className={styles.computer_image}
                            fill
                        />

                        <div className={styles.card_info}>
                            <h3 className={styles.card_title}>Self-growth</h3>

                            <div className={styles.card_features}>
                                <p className={styles.card_text}>
                                    Доступ ко всем видеоурокам<br />
                                    <br />
                                    Заданиям на закрепление<br />
                                    с автопроверкой<br />
                                    <br />
                                    Личный трекер прогресса<br />
                                    <br />
                                    Ежемесячный challenge<br />
                                    <br />
                                    Доступ к материалам<br />
                                    — на весь срок подписки
                                </p>
                            </div>

                            <div className={styles.card_price}>5000 рублей</div>
                        </div>
                    </div>
                </div>

                {/* Правая карточка - Guided Growth */}
                <div className={styles.card}>
                    <div className={styles.card_header}>
                        <CustomButton
                            buttonText="Записаться"
                            type="button"
                            className={styles.card_header_button}
                        />
                        <span className={styles.card_header_tag}>practice, feedback, community support</span>
                    </div>

                    <div className={styles.card_content}>
                        <Image
                            src={computer1Image}
                            alt="Computer illustration"
                            className={styles.computer_image}
                            fill
                        />

                        <div className={styles.card_info_right}>
                            <h3 className={styles.card_title_right}>Guided Growth</h3>

                            <div className={styles.card_features_right}>
                                <p className={styles.card_text_right}>
                                    Все преимущества Self-Growth<br />
                                    тарифа + cherry on top<br />
                                    <br />
                                    Speaking Clubs с преподавателем<br />
                                    <br />
                                    Задания на speaking & writing<br />
                                    с проверкой преподавателя<br />
                                    <br />
                                    Персональная поддержка<br />
                                    <br />
                                    Доступ к материалам — навсегда
                                </p>
                            </div>

                            <div className={styles.card_price_right}>9000 рублей</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Комментарий справа внизу */}
            <div className={styles.comment_wrapper}>
                <Image
                    src={commentImage}
                    alt=""
                    className={styles.comment_image}
                    fill
                />
                <p className={styles.comment_text}>
                    подходит тем, кто хочет<br />
                    выводить новые знания в речь
                </p>
            </div>

            {/* Большая кнопка внизу */}
            <div className={styles.demo_button_wrapper}>
                <CustomButton
                    buttonText="Бесплатный демо-урок"
                    type="button"
                />
            </div>
        </div>
    );
};

