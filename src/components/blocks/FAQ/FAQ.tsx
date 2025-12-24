import { FC, useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import xButtonIcon from '../../../images/components/cross.svg';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSection {
    title: string;
    items: FAQItem[];
}

const faqData: FAQSection[] = [
    {
        title: 'Основной курс',
        items: [
            {
                question: 'Как проходит обучение?',
                answer: 'Обучение проходит в формате онлайн-курса с интерактивными уроками и заданиями.',
            },
            {
                question: 'Как выглядят уроки?',
                answer: 'Уроки представлены в виде видеоматериалов, текстовых заданий и интерактивных упражнений.',
            },
            {
                question: 'Есть ли дедлайны?',
                answer: 'Да, для каждого модуля установлены дедлайны, чтобы помочь вам структурировать обучение.',
            },
            {
                question: 'Есть ли обратная связь?',
                answer: 'Да, вы получите обратную связь от преподавателей по всем выполненным заданиям.',
            },
            {
                question: 'Как определить свой уровень языка?',
                answer: 'Перед началом обучения мы проведем тестирование, которое определит ваш текущий уровень.',
            },
        ],
    },
    {
        title: 'Дайджест',
        items: [
            {
                question: 'В каком формате приходит дайджест?',
                answer: 'Всё проходит в закрытом Telegram-канале: удобно, быстро, доступно.<br /><br />5 дней в неделю вы получаете статьи про тренды и интересные концепции, разбор лексики с подробными пояснениями и примерами употребления.<br /><br />Для вашего удобства мы будем дублировать информацию в pdf формате, чтобы вам было легко скачать.<br /><br />Вечером вы получаете квизы с автопроверкой и автопояснением для практики лексики.',
            },
            {
                question: 'Для какого уровня английского подходит дайджест?',
                answer: 'Идеально для уровней B1–C1.<br /><br />Мы используем современную лексику, но даём объяснения, примеры и контекст, чтобы материал был понятным и легко применимым.<br /><br />Дайджест подойдет и для преподавателей английского: мы отбираем самое интересное для обсуждения на занятиях с вашими студентами',
            },
            {
                question: 'Как много времени занимает изучение дайджеста?',
                answer: '• Основной выпуск: 3–5 минут чтения<br />• Ежедневный квиз: 1–2 минуты<br /><br />Плюс вы можете возвращаться к материалам в удобное время — всё сохраняется в канале.',
            },
            {
                question: 'Могу ли я использовать дайджест как регулярную практику языка?',
                answer: 'Да — Update Digest формирует устойчивую привычку учить английский через современные темы<br /><br />Ежедневные квизы и формат microlearning активируют повторение и долгосрочное запоминание.',
            },
            {
                question: 'Есть ли тариф с Speaking Club?',
                answer: 'Да, тариф Level 2 даёт доступ к одной онлайн-встрече в месяц, где мы обсуждаем главные тренды и новости месяца из дайджеста.<br /><br />Это помогает: <br />• закрепить лексику <br />• делиться своим мнением с классным комьюнити <br />• чувствовать себя уверенно в современном английском',
            },
        ],
    },
];

export const FAQ: FC = () => {
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

    const toggleItem = (sectionIndex: number, itemIndex: number) => {
        const key = `${sectionIndex}-${itemIndex}`;
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>FAQ</h2>
            {faqData.map((section, sectionIndex) => (
                <div key={sectionIndex} className={styles.section}>
                    <h3 className={styles.sectionTitle}>{section.title}</h3>
                    <div className={styles.items}>
                        {section.items.map((item, itemIndex) => {
                            const key = `${sectionIndex}-${itemIndex}`;
                            const isOpen = openItems[key] || false;
                            return (
                                <div key={itemIndex} className={`${styles.item} ${isOpen ? styles.item_open : ''}`}>
                                    <button
                                        className={`${styles.itemButton} ${isOpen ? styles.itemButton_open : ''}`}
                                        onClick={() => toggleItem(sectionIndex, itemIndex)}
                                    >
                                        <span className={styles.itemQuestion}>{item.question}</span>
                                        <div
                                            className={`${styles.itemIcon} ${isOpen ? styles.itemIcon_open : ''}`}
                                        >
                                            <Image
                                                src={xButtonIcon}
                                                alt={isOpen ? 'Закрыть' : 'Открыть'}
                                                width={54}
                                                height={46}
                                            />
                                        </div>
                                    </button>
                                    {isOpen && (
                                        <div className={styles.itemAnswer}>
                                            <p>
                                                {item.answer.split('<br />').map((line, index, array) => (
                                                    <span key={index}>
                                                        {line}
                                                        {index < array.length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
