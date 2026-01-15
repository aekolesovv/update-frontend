import SEO from '@/components/SEO/SEO';
import { WellnessCourse } from '@/components/blocks/WellnessCourse/WellnessCourse';
import { GetStaticProps } from 'next';

const WellnessPage = () => {
    return (
        <>
            <SEO
                title="Wellness Course - Update"
                description="Курс wellness на английском языке - изучайте morning rituals, habits, energy givers, nutrition, holistic health, breathwork и biohacking"
                keywords="wellness курс, английский wellness, energy givers, morning rituals, holistic health, breathwork, biohacking"
            />
            <WellnessCourse />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};

export default WellnessPage;

