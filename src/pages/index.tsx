import SEO from '@/components/SEO/SEO';
import styles from './index.module.scss';
import { Title } from '@/components/blocks/Title/Title';
import { ForWhom } from '@/components/blocks/ForWhom/ForWhom';
import { WhyUs } from '@/components/blocks/WhyUs/WhyUs';
import { Features } from '@/components/blocks/Features/Features';

const MainPage = () => {
    return (
        <>
            <SEO
                title="Сэндвич-панели - BAYAR"
                description="Завод изготовитель сэндвич-панелей по лучшим ценам в РФ"
                keywords="сэндвич-панели, сэндвич панели купить, панели для строительства, строительные материалы, утепленные панели, Челны, Россия"
            />

            <div className={styles.main}>
                <Title />
                <ForWhom />
                <WhyUs />
                <Features />
            </div>
        </>
    );
};

export default MainPage;
