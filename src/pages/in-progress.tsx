import SEO from '@/components/SEO/SEO';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

const InProgressPage = () => {
    const router = useRouter();

    return (
        <>
            <SEO
                title="Страница в Разработке - Update"
                description="Страница находится в разработке"
                keywords="Progress, страница, Update"
            />

            <div className={styles.notFound}>
                <h1 className={styles.notFound__title}>In Progress...</h1>
                <p className={styles.notFound__subtitle}>Страница находится в разработке</p>
                <button
                    className={`${styles.loginForm__link} ${styles.loginForm__link_profile} ${styles.notFound__link} ${styles.link}`}
                    onClick={() => router.back()}
                >
                    Назад
                </button>
            </div>
        </>
    );
};

export default InProgressPage;
