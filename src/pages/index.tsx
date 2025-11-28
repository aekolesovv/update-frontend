import SEO from '@/components/SEO/SEO';
import styles from './index.module.scss';
import { Title } from '@/components/blocks/Title/Title';

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
                    <Title />
                </div>
            </div>
        </>
    );
};

export default MainPage;
