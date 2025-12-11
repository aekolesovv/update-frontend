import { FC } from 'react';
import styles from './style.module.scss';
import { Tag } from '@/components/Tag/Tag';

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
                    <div className={styles.card_tag}>
                        <Tag
                            text="system"
                            width={123}
                            height={36.04}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card_number}>2</div>
                    <p className={styles.card_text}>
                        вы хотите прокачать
                        свой английский
                    </p>
                    <div className={`${styles.card_tag} ${styles.card_tag_microlearning}`}>
                        <Tag
                            text="microlearning"
                            width={123}
                            height={36.04}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card_number}>3</div>
                    <p className={styles.card_text}>
                        у вас мало времени,
                        но хотите развиваться
                    </p>
                    <div className={styles.card_tag}>
                        <Tag
                            text="that's me!"
                            width={123}
                            height={36.04}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

