import { FC } from 'react';
import styles from './style.module.scss';

export const WhyWorks: FC = () => {
    return (
        <div className={styles.container} id="why-works">
            <h2 className={styles.title}>Почему это работает?</h2>

            <div className={styles.cards_wrapper}>
                <div className={`${styles.card} ${styles.card_first}`}>
                    <div className={styles.card_decorative_rect}></div>
                    <div className={styles.card_bottom_rect}></div>
                    <h3 className={styles.card_title}>Spaced repetition</h3>
                    <p className={styles.card_text}>
                        Продуманные интервалы повторения помогают перенести новые слова<br />
                        в долгосрочную память.<br />
                        Каждый элемент курса<br />
                        мы разработали так, чтобы вам было удобно работать с лексикой.
                    </p>
                </div>

                <div className={`${styles.card} ${styles.card_second}`}>
                    <div className={styles.card_decorative_rect}></div>
                    <div className={styles.card_bottom_rect}></div>
                    <h3 className={styles.card_title}>Meaningful learning</h3>
                    <p className={styles.card_text}>
                        Мы не даём случайные<br />
                        слова — мы даём живой язык через темы психологии, карьеры и жизни.<br />
                        <br />
                        Когда материал связан<br />
                        с вашими ценностями<br />
                        и целями, мозг усваивает<br />
                        его быстрее
                    </p>
                </div>

                <div className={`${styles.card} ${styles.card_third}`}>
                    <div className={styles.card_decorative_rect}></div>
                    <div className={styles.card_bottom_rect}></div>
                    <h3 className={styles.card_title}>Microlearning</h3>
                    <p className={styles.card_text}>
                        Микрообучение снижает когнитивную перегрузку: короткие уроки 5–10 минут помогают мозгу лучше концентрироваться<br />
                        и запоминать материал<br />
                        без стресса
                    </p>
                </div>
            </div>
        </div>
    );
};
