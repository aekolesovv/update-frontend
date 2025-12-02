import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';
import chatImage from '../../../images/components/chat.svg';

export const ForWhom: FC = () => {
    return (
        <div className={styles.container} id="for-whom">
            <h2 className={styles.title}>Для кого подходит Update?</h2>

            <div className={styles.cards_wrapper}>
                <div className={styles.card}>
                    <div className={styles.card_number}>1</div>
                    <p className={styles.card_text}>
                        вы устали тратить годы
                        на хаотичное обучение
                    </p>
                </div>

                <div className={styles.card}>
                    <div className={styles.card_number}>2</div>
                    <p className={styles.card_text}>
                        вы хотите прокачать
                        свой английский
                    </p>
                </div>

                <div className={styles.card}>
                    <div className={styles.card_number}>3</div>
                    <p className={styles.card_text}>
                        у вас мало времени,
                        но хотите развиваться
                    </p>
                </div>
            </div>

            <div className={styles.tags_wrapper}>
                <div className={styles.tag}>
                    <Image
                        src={chatImage}
                        alt="system tag"
                        className={styles.tag_image}
                        fill
                    />
                    <span className={styles.tag_text}>system</span>
                </div>
                <div className={styles.tag}>
                    <Image
                        src={chatImage}
                        alt="microlearning tag"
                        className={styles.tag_image}
                        fill
                    />
                    <span className={styles.tag_text}>microlearning</span>
                </div>
                <div className={styles.tag}>
                    <Image
                        src={chatImage}
                        alt="that's me tag"
                        className={styles.tag_image}
                        fill
                    />
                    <span className={styles.tag_text}>that&apos;s me!</span>
                </div>
            </div>
        </div>
    );
};

