import Image from 'next/image';
import { FC } from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import openEnvelopeImage from '../../../images/components/open-envelope.png';
import closeEnvelopeImage from '../../../images/components/close-envelope.png';
import levelCardImage from '../../../images/components/level-card.png';
import logoImage from '../../../images/logo/cherry.svg';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import { Tag } from '@/components/Tag/Tag';

export const Digest: FC = () => {
    const router = useRouter();

    return (
        <div className={styles.container} id="digest">
            <h2 className={styles.title}>Подписка Дайджест</h2>

            <div className={styles.content_wrapper}>
                <div>
                    {/* <div className={styles.envelopes_section}> */}
                    <div className={styles.close_envelope_wrapper}>
                        <Image
                            src={closeEnvelopeImage}
                            alt="Закрытый конверт письма дайджеста"
                            className={styles.envelope_image}
                            fill
                        />
                        <div className={styles.close_envelope_content}>
                            <div className={styles.envelope_text}>
                                <p>to: you</p>
                                <div>
                                    <span>from:&nbsp;</span>
                                    <div className={styles.logo_wrapper}>
                                        <Image
                                            src={logoImage}
                                            alt="Логотип Update в подписи письма"
                                            width={20}
                                            height={20}
                                            className={styles.logo_image}
                                        />
                                        <span className={styles.logo_text}>Update</span>
                                    </div>
                                </div>
                                <p className={styles.topics_text}>
                                    topics: <br />
                                    Wellness, Psychology, Pop<br /> culture, Trends, Career, Tech
                                </p>
                            </div>
                        </div>
                        <div className={styles.tag_wrapper_2}>
                            <Tag
                                text={`подходит для уровня B1\n и выше`}
                                width={324}
                                height={125}
                                mWidth={209}
                                mHeight={83}
                                tailLeft
                            />
                        </div>
                    </div>

                    <div className={styles.open_envelope_wrapper}>
                        <Image
                            src={openEnvelopeImage}
                            alt="Открытый конверт с письмом дайджеста"
                            className={styles.envelope_image}
                            fill
                        />
                        <div className={styles.open_envelope_content}>
                            <p>
                                Актуальные тренды<br />
                                и интересные новости
                            </p>
                            <p>
                                Разбор новой сочной лексики с ежедневной практикой
                            </p>
                            <p>
                                Лайфхаки для прокачки себя
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.cards_section}>
                    <div className={styles.wrapper}>

                        <div className={styles.card_wrapper}>
                            <Image
                                src={levelCardImage}
                                alt="Карточка тарифа Level 1 в блоке дайджеста"
                                className={styles.card_image}
                                fill
                            />
                            <div className={styles.card_content}>
                                <h3 className={styles.card_title}>Level 1</h3>
                                <p className={styles.card_text}>
                                    Доступ к материалам
                                </p>
                                <p className={styles.card_price}>490 рублей</p>
                            </div>
                        </div>
                        <CustomButton
                            buttonText="Подписаться"
                            type="button"
                            className={styles.button}
                            handleButtonClick={() => router.push('/in-progress')}
                        />
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.card_wrapper}>
                            <Image
                                src={levelCardImage}
                                alt="Карточка тарифа Level 2 в блоке дайджеста"
                                className={styles.card_image}
                                fill
                            />
                            <div className={styles.card_content}>
                                <h3 className={styles.card_title}>Level 2</h3>
                                <p className={styles.card_text}>
                                    Доступ к материалам<br />
                                    <br />
                                    + 1 speaking club в месяц с преподавателем
                                </p>
                                <p className={styles.card_price}>1490 рублей</p>
                            </div>
                        </div>
                        <CustomButton
                            buttonText="Подписаться"
                            type="button"
                            className={styles.button}
                            handleButtonClick={() => router.push('/in-progress')}
                        />
                    </div>
                </div>
                <div className={styles.tag_wrapper}>
                    <Tag
                        text={`присоединяйся и начинай\n неделю с Update!`}
                        width={350}
                        height={143}
                        mWidth={202}
                        mHeight={70}
                    />
                </div>
            </div>
        </div>
    );
};
