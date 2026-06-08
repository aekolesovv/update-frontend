import SEO from '@/components/SEO/SEO';
import { Landing } from '@/components/landing/Landing';
import { GetStaticProps } from 'next';

const MainPage = () => {
    return (
        <>
            <SEO
                title="Update You — Разговорные клубы английского | B1–C1"
                description="Регулярная разговорная практика английского в мини-группах B1–C1. Актуальные темы, безопасная среда, fluency и уверенность в речи."
                keywords="разговорные клубы английского, английский онлайн, speaking club, современный английский, тренды, fluency, B1, C1"
            />

            <Landing />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};

export default MainPage;
