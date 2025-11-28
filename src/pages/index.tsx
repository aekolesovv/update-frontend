import SEO from '@/components/SEO/SEO';
import styles from './index.module.scss';

const MainPage = () => {
    return (
        <>
            <SEO
                title="Сэндвич-панели - BAYAR"
                description="Завод изготовитель сэндвич-панелей по лучшим ценам в РФ"
                keywords="сэндвич-панели, сэндвич панели купить, панели для строительства, строительные материалы, утепленные панели, Челны, Россия"
            />

            <div className={styles.main}>
                <div className={styles.container}>
                    <h1>Test UpdateYou World</h1>

                </div>
            </div>
        </>
    );
};

export default MainPage;
