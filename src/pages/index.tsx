import SEO from '@/components/SEO/SEO';
import styles from './index.module.scss';
import { Title } from '@/components/blocks/Title/Title';
import { ForWhom } from '@/components/blocks/ForWhom/ForWhom';
import { WhyUs } from '@/components/blocks/WhyUs/WhyUs';
import { Features } from '@/components/blocks/Features/Features';
import { WhyWorks } from '@/components/blocks/WhyWorks/WhyWorks';
import { Tariffs } from '@/components/blocks/Tariffs/Tariffs';
import { Digest } from '@/components/blocks/Digest/Digest';
import { Start } from '@/components/blocks/Start/Start';
import { FAQ } from '@/components/blocks/FAQ/FAQ';
import { QuestionsForm } from '@/components/blocks/QuestionsForm/QuestionsForm';
import { AboutUs } from '@/components/blocks/AboutUs/AboutUs';
import { GetStaticProps } from 'next';

const MainPage = () => {
    return (
        <>
            <SEO
                title="Курсы английского - Update"
                description="тематические microlearning курсы английского еженедельный дайджест трендов"
                keywords="курсы английского, английский онлайн, современный английский, тренды, разговорные клубы, speaking club"
            />

            <div className={styles.main}>
                <Title />
                <ForWhom />
                <WhyUs />
                <Features />
                <AboutUs />
                <WhyWorks />
                <Tariffs />
                {/*<Digest />
                <Start />
                <FAQ />
                <QuestionsForm /> */}
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};

export default MainPage;
