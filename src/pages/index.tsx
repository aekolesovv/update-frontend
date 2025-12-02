import SEO from '@/components/SEO/SEO';
import styles from './index.module.scss';
import { Title } from '@/components/blocks/Title/Title';
import { ForWhom } from '@/components/blocks/ForWhom/ForWhom';
import { WhyUs } from '@/components/blocks/WhyUs/WhyUs';
import { Features } from '@/components/blocks/Features/Features';
import { WhyWorks } from '@/components/blocks/WhyWorks/WhyWorks';
import { Tariffs } from '@/components/blocks/Tariffs/Tariffs';
import { Reviews } from '@/components/blocks/Reviews/Reviews';
import { Digest } from '@/components/blocks/Digest/Digest';

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
                <WhyWorks />
                <Tariffs />
                <Digest />
            </div>
        </>
    );
};

export default MainPage;
