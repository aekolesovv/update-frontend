import SEO from '@/components/SEO/SEO';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import { GetStaticProps } from 'next';
import { PlugPopup } from '@/components/PlugPopup/PlugPopup';

const courseDescriptions: Record<string, { title: string; description: string }> = {
    'wellness': {
        title: 'Wellness',
        description: '',
    },
    'communication-skills': {
        title: 'Communication skills',
        description: 'Этот курс — про уверенное общение на английском:\n\nот нетворкинга и публичных выступлений\n\nдо сторителлинга, языка тела и активного слушания.',
    },
    psychology: {
        title: 'Psychology',
        description: 'Вы будете учиться говорить по-английски об уверенности и личных границах, лучше понимать себя и других и спокойнее общаться в сложных ситуациях.',
    },
    business: {
        title: 'Business',
        description: 'Вы научитесь говорить по-английски на встречах и переговорах, обсуждать истории успеха фаундеров и использовать ключевую бизнес-лексику.',
    },
    fashion: {
        title: 'Fashion',
        description: 'Будем учиться говорить на одном языке с Мирандой Пристли, обсуждая тренды и индустрию, как в настоящем модном доме.',
    },
    'cognitive-biases': {
        title: 'Cognitive biases',
        description: 'Вы узнаете, как эффект якоря заставляет вас оценивать всё через первое впечатление, как confirmation bias выбирает только ту информацию, которая вам нравится. На курсе вы будете распознавать ловушки мышления, разбирать примеры и прокачивать английский.',
    },
};

const InProgressPage = () => {
    const router = useRouter();
    const [course, setCourse] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            const courseParam = router.query.course as string;
            if (courseParam && courseDescriptions[courseParam]) {
                setCourse(courseParam);
            }
        }
    }, [router.isReady, router.query.course]);

    const courseData = course ? courseDescriptions[course] : null;

    return (
        <>
            <SEO
                title="Страница в Разработке - Update"
                description="Страница находится в разработке"
                keywords="Progress, страница, Update"
            />

            <div className={styles.notFound}>
                <div className={styles.notFound__content}>
                    <h1 className={styles.notFound__title}>In Progress...</h1>
                    {courseData ? (
                        <div className={styles.courseInfo}>
                            <p className={styles.courseDescription}>
                                Мы разрабатываем курс &quot;{courseData.title}&quot;.
                                <br />
                                <br />
                                {courseData.description.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        {index < courseData.description.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                                <br />
                                <br />
                                Запишитесь в лист ожидания, и мы сообщим вам о старте.
                            </p>
                        </div>
                    ) : (
                        <p className={styles.notFound__subtitle}>Страница находится в разработке</p>
                    )}
                    {courseData && (
                        <div className={styles.notFound__buttonWrapper}>
                            <CustomButton
                                buttonText="Сообщить о старте"
                                type="button"
                                handleButtonClick={() => setIsPopupOpen(true)}
                            />
                        </div>
                    )}
                    <button
                        className={`${styles.loginForm__link} ${styles.loginForm__link_profile} ${styles.notFound__link} ${styles.link}`}
                        onClick={() => router.back()}
                    >
                        Назад
                    </button>
                </div>
            </div>

            <PlugPopup
                isOpened={isPopupOpen}
                setIsOpened={setIsPopupOpen}
                title={courseData?.title || ''}
            />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};

export default InProgressPage;
