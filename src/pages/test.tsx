import dynamic from 'next/dynamic';
import SEO from '@/components/SEO/SEO';
import { GetStaticProps } from 'next';

// Client-only: the test relies on localStorage, SpeechSynthesis and MediaRecorder.
const LevelTest = dynamic(() => import('@/components/test/LevelTest').then(m => m.LevelTest), {
    ssr: false,
});

const TestPage = () => {
    return (
        <>
            <SEO
                title="Тест уровня английского за 5 минут — Update You"
                description="Бесплатный тест уровня английского без регистрации: грамматика, лексика, чтение и аудирование. В конце — точный CEFR-уровень, разбор по навыкам и рекомендации."
                keywords="тест уровня английского, CEFR тест, проверить уровень английского, английский онлайн, level test"
            />
            <LevelTest />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return { props: {} };
};

export default TestPage;
