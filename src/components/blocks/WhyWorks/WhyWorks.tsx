import { FC } from 'react';
import styles from './style.module.scss';

interface CardData {
    type: 'first' | 'second' | 'third';
    title: string;
    text: string;
}

const cardData: CardData[] = [
    {
        type: 'first',
        title: 'Spaced repetition',
        text: 'Продуманные интервалы повторения помогают перенести новые слова\nв долгосрочную память.\nКаждый элемент курса\nмы разработали так, чтобы вам было удобно работать с лексикой.',
    },
    {
        type: 'second',
        title: 'Meaningful learning',
        text: 'Мы не даём случайные\nслова — мы даём живой язык через темы психологии, карьеры и жизни.\n\nКогда материал связан\nс вашими ценностями\nи целями, мозг усваивает\nего быстрее',
    },
    {
        type: 'third',
        title: 'Microlearning',
        text: 'Микрообучение снижает когнитивную перегрузку: короткие уроки 5–10 минут помогают мозгу лучше концентрироваться\nи запоминать материал\nбез стресса',
    },
];

export const WhyWorks: FC = () => {
    return (
        <div className={styles.container} id="why-works">
            <h2 className={styles.title}>Почему это работает?</h2>

            <div className={styles.cards_wrapper}>
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className={`${styles.card} ${styles[`card_${card.type}`]}`}
                    >
                        <div className={styles.card_decorative_rect}></div>
                        <div className={styles.card_bottom_rect}></div>
                        <h3 className={styles.card_title}>{card.title}</h3>
                        <p className={styles.card_text}>
                            {card.text.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < card.text.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
