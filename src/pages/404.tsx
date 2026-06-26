import SEO from '@/components/SEO/SEO';
import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <>
            <SEO
                title="Страница не найдена — Update You"
                description="Такой страницы нет или она переехала. Вернитесь на главную Update You — разговорные клубы английского B1–C1."
                keywords="404, страница не найдена, Update You"
            />

            <div className="uyRoot">
                <header className="bar">
                    <Link className="brand" href="/">
                        <span className="brand-mark">U</span>
                        <span className="brand-text">
                            Update You
                            <br />
                            Разговорные клубы
                        </span>
                    </Link>
                    <Link className="bar-back" href="/">
                        ← На сайт
                    </Link>
                </header>

                <main className="nf">
                    <div className="nf-eyebrow">— Ошибка 404</div>
                    <div className="nf-code">404</div>
                    <h2 className="nf-title">
                        Страница <em>не найдена</em>
                    </h2>
                    <p className="nf-text">
                        Кажется, такой страницы нет или она переехала. Давай вернёмся к разговорным клубам — там есть чем
                        заняться.
                    </p>
                    <div className="nf-actions">
                        <Link className="nf-cta" href="/">
                            На главную →
                        </Link>
                        <Link className="nf-ghost" href="/test">
                            Пройти тест уровня
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
};

export default NotFoundPage;
