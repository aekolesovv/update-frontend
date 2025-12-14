import { FC } from 'react';
import styles from './style.module.scss';
import { PersonCard } from '@/components/PersonCard/PersonCard';
import alexImage from '../../../images/components/alex.png';
import maryImage from '../../../images/components/mary.png';
import alinaImage from '../../../images/components/alina.png';

export const AboutUs: FC = () => {
    return (
        <div className={styles.container} id="about-us">
            <h2 className={styles.title}>СТАРАЕМСЯ ДЛЯ ВАС</h2>

            <div className={styles.content}>
                {/* ALEX Card - сверху по центру */}
                <PersonCard
                    name="ALEX"
                    imageSrc={alexImage}
                    imageAlt="Alex"
                    imageWidth={382}
                    imageHeight={372}
                    mImageWidth={243}
                    mImageHeight={237}
                    role="Risk Guardian"
                    description={
                        <>
                            Держит щит над проектом, когда приходят риски: финансовые, маркетинговые или продуктовые.<br /><br />
                            Играет на нескольких досках одновременно, выстраивает стратегии так, чтобы команда шла вперёд без фатальных ловушек.
                        </>
                    }
                    className={styles.card_alex}
                />

                {/* Нижний ряд с двумя карточками */}
                <div className={styles.content_bottom}>
                    {/* ALINA Card */}
                    <PersonCard
                        name="ALINA"
                        imageSrc={alinaImage}
                        imageAlt="Alina"
                        imageWidth={218}
                        imageHeight={381}
                        mImageWidth={177}
                        mImageHeight={309.64}
                        tags={{
                            level: 'level C2',
                            xp: 'XP',
                            tesol: 'TESOL: grade A',
                        }}
                        description="Помогает звучать уверенно на подкастах, встречах и деловых поездках, обсуждая самые hot trends"
                        sections={[
                            {
                                label: 'background',
                                text: (
                                    <>
                                        учила английский на Мальте, Кипре,<br />
                                        в Ирландии<br />
                                        русско-английский бакалавриат<br />
                                        курсы по преподаванию высоким уровням
                                    </>
                                ),
                            },
                            {
                                label: 'ultimate skill',
                                text: 'Алина превращает speaking-сессию в поток, где каждое обсуждение адаптируется под вас и ваши цели.',
                            },
                        ]}
                        className={styles.card_alina}
                    />

                    {/* MARY Card */}
                    <PersonCard
                        name="MARY"
                        imageSrc={maryImage}
                        imageAlt="Mary"
                        imageWidth={218}
                        imageHeight={381}
                        mImageWidth={177}
                        mImageHeight={309.64}
                        tags={{
                            level: 'level C2',
                            xp: 'XP',
                        }}
                        description="Работает с теми, кто ценит смысл и стиль. Вела на английском клуб дебатов и киноклуб, где мы обсуждали самые bold идеи и тренды"
                        sections={[
                            {
                                label: 'background',
                                text: (
                                    <>
                                        лингвист-переводчик по образованию<br />
                                        курсы по преподаванию высоким уровням<br />
                                        жила заграницей
                                    </>
                                ),
                            },
                            {
                                label: 'ultimate skill',
                                text: 'Мэри хронически онлайн, чтобы вам не приходилось. Знает, что любая тема может стать thought-provoking',
                            },
                        ]}
                        className={styles.card_mary}
                    />
                </div>
            </div>
        </div>
    );
};

