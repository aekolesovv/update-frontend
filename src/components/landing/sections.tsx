/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import Link from 'next/link';
import { AriaChat } from './AriaChat';
import { ModalSource } from './modal/pitches';

export type OpenModal = (source: ModalSource) => void;

const TileArrow: FC = () => (
    <div className="tile-arrow">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M3 11 L11 3 M5 3 L11 3 L11 9" />
        </svg>
    </div>
);

/* ===== NAV ===== */
export const Nav: FC<{ onModal: OpenModal }> = ({ onModal }) => (
    <nav>
        <a href="#" className="nav-logo">
            <span className="nav-logo-mark">U</span>
            <span className="nav-logo-text">
                Разговорные клубы
                <br />
                английского
            </span>
        </a>
        <div className="nav-menu">
            <a href="#format" className="nav-pill">
                Формат клубов
            </a>
            <a href="#founders" className="nav-pill">
                Команда
            </a>
            <a href="#price" className="nav-pill">
                Подписка
            </a>
            <a href="#faq" className="nav-pill">
                FAQ
            </a>
            <Link href="/test" className="nav-pill nav-pill--test">
                Тест уровня
            </Link>
        </div>
        <button type="button" className="nav-cta" onClick={() => onModal('trial')}>
            Попробовать
        </button>
        <button className="nav-burger" aria-label="Меню">
            <span />
        </button>
    </nav>
);

/* ===== HERO ===== */
export const Hero: FC<{ onModal: OpenModal }> = ({ onModal }) => (
    <header className="hero wrap">
        <h1 className="hero-logo">UPDATE YOU</h1>
        <div className="hero-sub">разговорный английский · b1—c1</div>

        <p className="hero-pain">
            Уровень есть. Свободы — <em>нет</em>. Помогаем пройти последнюю милю — от «читаю Forbes» до «веду
            переговоры».
        </p>
        <button type="button" className="hero-pain-cta" onClick={() => onModal('trial')}>
            За 20 минут на бесплатной диагностике покажем, где именно у тебя затык{' '}
            <strong>узнать свой уровень →</strong>
        </button>
        <div className="hero-test-line">
            <span>Не готов к звонку?</span>
            <Link href="/test" className="hero-test-link">
                Пройди тест уровня за 5 минут — бесплатно и без регистрации →
            </Link>
        </div>

        <div className="hero-objections">
            <span className="hero-objection">
                <b>3–5</b> человек в группе. Никто не «спрашивает у доски».
            </span>
            <span className="hero-objection">
                <b>90 минут</b> в неделю. Записи не нужны — встретился, поговорил, вышел.
            </span>
            <span className="hero-objection">
                <b>Темы под тебя</b> — карьера, культура, тренды. Не «My family».
            </span>
        </div>

        <div className="hero-eyebrow-row">
            <span>est 2021</span>
            <span>fluency · confidence · community</span>
        </div>

        <div className="tiles">
            <article className="tile">
                <img
                    className="tile-img"
                    src="/images/landing/founders-together.jpg"
                    alt="Алина и Алекс Колесовы — Update You"
                />
                <h3 className="tile-title">
                    Клубы
                    <br />
                    для B1—B2
                </h3>
                <div className="tile-bottom">
                    <a href="#schedule" className="tile-btn">
                        Посмотреть расписание
                    </a>
                    <div className="tile-meta">
                        <span>
                            В группе<strong>3–5 человек</strong>
                        </span>
                        <span>
                            Формат<strong>90 минут</strong>
                        </span>
                    </div>
                    <TileArrow />
                </div>
            </article>

            <article className="tile solid">
                <h3 className="tile-title">
                    Бесплатная
                    <br />
                    консультация
                </h3>
                <div>
                    <p>Узнай свой уровень и получи советы для буста английского.</p>
                </div>
                <div className="tile-bottom">
                    <button type="button" className="tile-btn" onClick={() => onModal('club')}>
                        Записаться
                    </button>
                </div>
            </article>

            <article className="tile">
                <img className="tile-img" src="/images/landing/club-discussion.jpg" alt="Обсуждение за столом" />
                <h3 className="tile-title">
                    Клубы
                    <br />
                    для B2—C1
                </h3>
                <div className="tile-bottom">
                    <a href="#schedule" className="tile-btn">
                        Узнать темы
                    </a>
                    <div className="tile-meta">
                        <span>
                            Темы<strong>обновляются</strong>
                        </span>
                        <span>
                            Уровень<strong>advanced</strong>
                        </span>
                    </div>
                    <TileArrow />
                </div>
            </article>

            <article className="tile solid" style={{ background: '#5a161f' }}>
                <h3 className="tile-title">
                    Подписка
                    <br />
                    на месяц
                </h3>
                <div>
                    <p>
                        Регулярная разговорная практика без перерывов.
                        <br />
                        Один платёж — доступ ко всем клубам твоего уровня.
                    </p>
                </div>
                <div className="tile-bottom">
                    <a href="#price" className="tile-btn">
                        Подключиться
                    </a>
                </div>
            </article>
        </div>
    </header>
);

/* ===== MARQUEE ===== */
export const Marquee: FC = () => (
    <div className="marquee">
        <div className="marquee-track">
            <span>speak with confidence</span>
            <span>think in english</span>
            <span>real conversations</span>
            <span>mini-groups · B1—C1</span>
            <span>speak with confidence</span>
            <span>think in english</span>
            <span>real conversations</span>
            <span>mini-groups · B1—C1</span>
        </div>
    </div>
);

/* ===== PROBLEM ===== */
const PROBLEMS = [
    'Хочется системы, чтобы не копить скрины с рандомной лексикой',
    'Понимаешь намного больше, чем можешь сказать сам',
    'Не хватает регулярной разговорной практики',
    'Чувствуется плато в изучении языка, нужен буст',
    'Мало времени на изучение языка',
    'Хочется говорить уверенно на актуальные темы',
];

export const Problem: FC = () => (
    <section id="problem" className="wrap reveal">
        <div className="section-eyebrow">— Знакомо?</div>
        <h2 className="section-title">
            Ты знаешь
            <br />
            английский. <em>Но…</em>
        </h2>
        <div className="problem-grid">
            {PROBLEMS.map((text, i) => (
                <div className="problem-card" key={i}>
                    <div className="problem-num">({String(i + 1).padStart(2, '0')})</div>
                    <div className="problem-text">{text}</div>
                </div>
            ))}
        </div>
    </section>
);

/* ===== ABOUT / METHOD ===== */
const METHOD_LIST = [
    'Микрообучение: разборы, которые дают реальный прогресс без перегруза',
    'Только актуальные темы в сферах: маркетинг, саморазвитие, карьера, wellness, поп-культура',
    'Полное погружение: вы находитесь внутри языковой среды ежедневно, не только во время клубов',
    'Фокус на контексте: разбираем лексику из аутентичных источников о трендах и событиях',
    'Безопасная среда: ошибаться можно и нужно, на этом строится fluency.',
];

const STATS = [
    { num: '3–5', txt: 'человек в каждой группе — у каждого есть возможность поделиться мнением' },
    { num: '4+', txt: 'клубов в неделю в подписке — выбирай удобное время' },
    { num: '87%', txt: 'участников остаются на второй месяц подписки' },
    { num: '100%', txt: 'онлайн — подключаешься с ноутбука откуда угодно' },
];

export const Method: FC = () => (
    <section className="wrap reveal">
        <div className="about">
            <div className="about-left">
                <div className="section-eyebrow">— Подход</div>
                <h2 className="section-title">Update</h2>
                <p className="about-lead">
                    Это регулярная разговорная практика в маленьких группах — для тех, кто уже знает английский, но хочет
                    наконец заговорить свободно.
                </p>
                <ul className="about-list">
                    {METHOD_LIST.map((txt, i) => (
                        <li key={i}>
                            <span className="num">({String(i + 1).padStart(2, '0')})</span>
                            <span className="txt">{txt}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="about-right about-right--photo">
                <img
                    className="about-photo"
                    src="/images/landing/about-method.jpg"
                    alt="Пример клуба Update You — разбор брендинга и культурной экономики"
                />
            </div>
        </div>

        <div className="stats">
            {STATS.map((s, i) => (
                <div className="stat" key={i}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-txt">{s.txt}</div>
                </div>
            ))}
        </div>
    </section>
);

/* ===== FOUNDERS ===== */
export const Founders: FC = () => (
    <section id="founders" className="wrap reveal">
        <div className="founders-intro">
            <div className="section-eyebrow">— Основатели</div>
            <h2 className="section-title">
                Люди за
                <br />
                Update
            </h2>
        </div>

        <div className="founder">
            <div className="founder-text">
                <div className="founder-eyebrow">Сооснователь · Преподаватель</div>
                <h3 className="founder-name">
                    Алина
                    <br />
                    Колесова
                </h3>
                <div className="founder-tagline">9 лет я преподаю английский тем, кто мыслит шире</div>
                <p className="founder-bio">
                    Мы обсуждаем с дизайнерами принципы нейроархитектуры,
                    <br />с маркетологами — механику вирусного контента,
                    <br />с предпринимателями — гибкость в условиях меняющегося рынка.
                    <br />
                    Английский становится инструментом мышления и роста.
                    <br />
                    Так родилась идея Апдейт — сообщества для тех, кто хочет развиваться на протяжении всей жизни.
                </p>
                <ul className="founder-creds">
                    <li>
                        <span className="cnum">(01)</span>
                        <span className="ctxt">
                            Подготовка к собеседованиям, прогоны подкастов, накопившийся tea — каждый запрос превращается
                            в живую работу с реальным контекстом.
                        </span>
                    </li>
                    <li>
                        <span className="cnum">(02)</span>
                        <span className="ctxt">
                            Для каждого студента — персональная подборка актуальных материалов именно из его сферы.
                        </span>
                    </li>
                    <li>
                        <span className="cnum">(03)</span>
                        <span className="ctxt">
                            РЭУ им. Плеханова, русско-английская программа «Экономика и управление гостиничным бизнесом».
                        </span>
                    </li>
                </ul>
                <div className="founder-tags">
                    <span className="founder-tag">English Language Academy Malta</span>
                    <span className="founder-tag">Malvern House × UCLan Cyprus</span>
                    <span className="founder-tag">Malvern House Ireland</span>
                    <span className="founder-tag">TESOL · Grade A</span>
                    <span className="founder-tag">IELTS C1</span>
                </div>
            </div>
            <div className="founder-photo">
                <img src="/images/landing/founder-alina.jpg" alt="Алина Колесова — сооснователь Update You" />
            </div>
        </div>

        <div className="founder flipped">
            <div className="founder-photo">
                <img src="/images/landing/founder-alex.jpg" alt="Алекс Колесов — сооснователь Update You" />
            </div>
            <div className="founder-text">
                <div className="founder-eyebrow">Сооснователь · Tech Builder</div>
                <h3 className="founder-name">
                    Алекс
                    <br />
                    Колесов
                </h3>
                <div className="founder-tagline">
                    7+ лет в digital-проектах.
                    <br />
                    Строю платформу, которая учит быстрее
                </div>
                <p className="founder-bio">
                    Собираю выжимку полезного из всего инфошума и использую данные рабочего процесса, чтобы наши продукты
                    имели актуальную информацию, а клиенты держали руку на пульсе изменений в маркетинге, tech and AI.
                </p>
                <ul className="founder-creds">
                    <li>
                        <span className="cnum">(01)</span>
                        <span className="ctxt">
                            Технологическая платформа и AI-инструменты обучения — чтобы язык применялся быстрее в работе и
                            жизни.
                        </span>
                    </li>
                    <li>
                        <span className="cnum">(02)</span>
                        <span className="ctxt">Обрабатываю обратную связь пользователей и курирую службу заботы.</span>
                    </li>
                    <li>
                        <span className="cnum">(03)</span>
                        <span className="ctxt">
                            7+ лет опыта в digital: от продуктовой разработки до маркетинговых технологий.
                        </span>
                    </li>
                </ul>
                <div className="founder-tags">
                    <span className="founder-tag">Digital Products</span>
                    <span className="founder-tag">AI &amp; EdTech</span>
                    <span className="founder-tag">Marketing Tech</span>
                    <span className="founder-tag">7+ лет</span>
                </div>
            </div>
        </div>
    </section>
);

/* ===== SOLUTION / FORMAT ===== */
export const Format: FC = () => (
    <section id="format" className="wrap reveal">
        <div className="section-eyebrow">— Что внутри клуба</div>
        <h2 className="section-title">
            Практика, которая
            <br />
            развивает <em>fluency</em>
        </h2>

        <div className="solution-grid">
            <div className="sol-card">
                <h3>Живые обсуждения</h3>
                <p>
                    Как бренды пробивают баннерную слепоту?
                    <br />
                    Почему сейчас так важен принцип «fail fast»?
                    <br />
                    Что приходит на смену биохакингу в wellness?
                    <br />
                    Обсуждаем только самое актуальное в мире.
                </p>
            </div>
            <div className="sol-card light">
                <h3>Безопасная среда</h3>
                <p>
                    Мы создаём пространство, где люди с похожими целями поддерживают друг друга. Это условия, которые
                    помогут вам прокачать навык начинать разговор, поддерживать беседу и задавать уточняющие вопросы.{' '}
                </p>
            </div>
        </div>

        <div className="format">
            <div className="format-img">
                <img src="/images/landing/format-club.jpg" alt="Разговорный клуб" />
                <div className="format-img-level">B1 — C1</div>
                <div className="format-img-title">
                    Как проходит
                    <br />
                    один клуб
                </div>
            </div>
            <div className="format-content">
                <div>
                    <h3>
                        90 минут разговора,
                        <br />
                        без скуки и без давления
                    </h3>
                    <p>
                        Обсуждение самых актуальных и топовых тем:
                        <br />
                        брейнстормим, сравниваем, анализируем и формируем собственное мнение с помощью лексики, которую
                        реально используют носители языка.
                    </p>
                    <a href="#price" className="format-cta">
                        Прийти на бесплатную консультацию
                    </a>
                </div>
                <div className="format-meta">
                    <div className="format-meta-card">
                        <ul>
                            <li>3–5 человек в группе</li>
                            <li>90 минут живого общения</li>
                            <li>Преподаватель, бережно направляющий флоу обсуждений</li>
                        </ul>
                    </div>
                    <div className="format-meta-card">
                        <ul>
                            <li>Темы обновляются каждую неделю</li>
                            <li>Материалы перед клубом</li>
                            <li>Запись и краткий конспект после</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

/* ===== PROGRAM / weeks ===== */
const WEEKS = [
    {
        cls: 'week-light',
        title: '1 неделя',
        items: [
            ['AI', 'taste is a new core skill in 2026'],
            ['wellness', 'joyspan: что приходит на смену lifespan'],
            ['mind', 'two-way door decision: как принимать решения?'],
            ['pop culture', 'typecasting: почему актёры становятся заложниками одной роли?'],
        ],
    },
    {
        cls: 'week-dark',
        title: '2 неделя',
        items: [
            ['lifestyle', 'the analog delusion: что не так с трендом на аналоговые хобби?'],
            ['AI', 'AI fatigue: как ИИ влияет на наше ментальное здоровье?'],
            ['marketing', 'секреты успеха топовых маркетинговых кампейнов'],
            ['design', 'дизайн аэропортов: какие психологические трюки влияют на нас?'],
        ],
    },
    {
        cls: 'week-light',
        title: '3—4 неделя',
        items: [
            ['business', 'loneliness economy: как компании зарабатывают на одиночестве'],
            ['marketing', 'sensory marketing: как аппетитные ассоциации влияют на продажи'],
            ['business', 'fail fast: в чём сила этого принципа в 2026?'],
            ['wellness', 'the rise of maxxing: чем вызвано желание оптимизировать свою жизнь?'],
        ],
    },
];

export const Program: FC = () => (
    <section id="schedule" className="wrap reveal">
        <div className="program-title-wrap">
            <div className="section-eyebrow">— Темы клубов</div>
            <h2 className="section-title center">
                Месяц <em>в подписке</em>
            </h2>
            <div className="program-sub">&lt;листай&gt;</div>
        </div>

        <div className="weeks">
            {WEEKS.map((w, i) => (
                <div className={`week ${w.cls}`} key={i}>
                    <div className="week-bookmark" />
                    <h3>{w.title}</h3>
                    <ul>
                        {w.items.map(([lbl, desc], j) => (
                            <li key={j}>
                                <span className="lbl">{lbl}</span>
                                <span className="desc">{desc}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

/* ===== PLATFORM ===== */
const PLATFORM_LIST = [
    'Запишитесь на консультацию для определения вашего уровня и персонального трека для изучения английского.',
    'Каждый будний день получайте материал для изучения с разбором лексики и квизом для закрепления.',
    'Подключайтесь к разговорным клубам онлайн для практики.',
    'Говорите каждую неделю и замечайте, как речь становится свободнее.',
];

export const Platform: FC = () => (
    <section className="wrap reveal">
        <div className="platform">
            <div className="platform-img-box">
                <div className="mock-stack">
                    <div className="mock mock-1">
                        <div className="mock-bar">
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className="mock-row">
                            <span className="who">Personalized nutrition · B1</span>
                            <span className="time">Пн · 19:00</span>
                        </div>
                        <div className="mock-row">
                            <span className="who">Work &amp; career · B2</span>
                            <span className="time">Вт · 20:00</span>
                        </div>
                        <div className="mock-row">
                            <span className="who">Hot debates · C1</span>
                            <span className="time">Чт · 20:00</span>
                        </div>
                    </div>
                    <div className="mock mock-2">
                        <div className="mock-bar">
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className="mock-row">
                            <span className="who">How cult brands sell belonging?</span>
                            <span className="badge">live</span>
                        </div>
                        <div className="mock-row">
                            <span className="who">3 of 5 joined</span>
                            <span className="time">19:32</span>
                        </div>
                    </div>
                    <div className="mock mock-3">
                        <div className="mock-bar">
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className="mock-row">
                            <span className="who">Words of the week</span>
                            <span className="time">→</span>
                        </div>
                        <div className="mock-row">
                            <span className="who">pivot · roll out · at the intersection of</span>
                            <span className="time">+12</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="section-eyebrow">— Как это устроено</div>
                <h2 className="section-title">
                    Просто
                    <br />
                    начать<em>.</em>
                </h2>
                <ul className="platform-list">
                    {PLATFORM_LIST.map((txt, i) => (
                        <li key={i}>
                            <span className="num">({String(i + 1).padStart(2, '0')})</span>
                            <span className="txt">{txt}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);

/* ===== REVIEWS ===== */
const REVIEWS = [
    {
        text: 'Через месяц поймала себя на том, что в командировке говорила без подготовки. Просто говорила.',
        ava: 'А',
        name: 'Аня, product manager',
        meta: 'B2 · 3 месяца',
    },
    {
        text: 'Люблю быть в курсе событий, особенно когда нет времени самой всё чекать',
        ava: 'М',
        name: 'Мария, преподаватель',
        meta: 'B1 · 5 месяцев',
    },
    {
        text: 'Главное — регулярность. Раз в неделю говорить вслух — и язык как будто оживает.',
        ava: 'С',
        name: 'Сергей, разработчик',
        meta: 'B2 · 4 месяца',
    },
    {
        text: 'Разбираем кейсы и примеры, которые помогают мне более уверенно говорить на работе',
        ava: 'К',
        name: 'Елена, маркетолог',
        meta: 'C1 · 2 месяца',
    },
];

export const Reviews: FC = () => (
    <section className="wrap reveal">
        <div className="section-eyebrow">— Отзывы</div>
        <h2 className="section-title">
            Что говорят
            <br />
            участники
        </h2>
        <div className="reviews">
            {REVIEWS.map((r, i) => (
                <div className="review" key={i}>
                    <p className="review-text">{r.text}</p>
                    <div className="review-author">
                        <div className="review-ava">{r.ava}</div>
                        <div>
                            <div className="review-name">{r.name}</div>
                            <div className="review-meta">{r.meta}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

/* ===== AI TUTOR BANNER (Aria) ===== */
export const AriaBanner: FC<{ onModal: OpenModal }> = ({ onModal }) => (
    <section className="aria-banner wrap reveal">
        <div className="aria-card">
            <div className="aria-left">
                <div className="aria-chip">
                    <span className="aria-chip-dot" />
                    Aria · AI English Tutor
                </div>
                <h2 className="aria-headline">
                    You keep making
                    <br />
                    the same mistakes.
                    <br />
                    <em>Nobody notices.</em>
                </h2>
                <p className="aria-problem">
                    На клубе мы говорим — и это главное. Но <strong>между занятиями</strong> артикли, предлоги, неверные
                    фразы копятся незаметно. Aria слушает, как ты говоришь на самом деле, и говорит,{' '}
                    <strong>что именно нужно исправить прямо сейчас.</strong> Доступна в любое время — даже в 2 ночи.
                </p>
                <button type="button" className="aria-cta" onClick={() => onModal('trial')}>
                    Попробовать Aria
                    <svg
                        width="13"
                        height="13"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 11 L11 3 M5 3 L11 3 L11 9" />
                    </svg>
                </button>
            </div>

            <div className="aria-right">
                <div className="aria-session-label">Live session with Aria</div>
                <AriaChat />
            </div>
        </div>
    </section>
);

/* ===== PRICING ===== */
const PLANS: Array<{
    featured: boolean;
    duration: string;
    forText: string;
    old: string | null;
    amount: string;
    sub: string;
    badge: string | null;
    features: string[];
    cta: string;
    source: ModalSource;
}> = [
    {
        featured: false,
        duration: '1 месяц',
        forText: 'Попробовать формат. Понять — твоё или нет.',
        old: null,
        amount: '8 000',
        sub: 'в месяц · попробовать формат',
        badge: null,
        features: [
            '4 клуба в месяц по 1,5 часа',
            'Мини-группы 3–5 человек, твой уровень B1—C1',
            'Темы и материалы каждую неделю',
            'Конспект после клуба',
        ],
        cta: 'Начать →',
        source: 'plan-1',
    },
    {
        featured: true,
        duration: '3 месяца',
        forText: 'Реальный апгрейд: с «понимаю» до «свободно говорю».',
        old: '24 000 ₽',
        amount: '21 600',
        sub: '7 200 ₽ / мес · экономия 2 400 ₽',
        badge: 'Скидка 10%',
        features: [
            'Всё из месячного тарифа',
            'Приоритетная запись на лучшее время',
            'Личный куратор по уровню',
            'Заморозка подписки до 2 недель',
        ],
        cta: 'Присоединиться →',
        source: 'plan-3',
    },
    {
        featured: false,
        duration: '6 месяцев',
        forText: 'Смена уровня и закрепление: не откатишься через полгода.',
        old: '48 000 ₽',
        amount: '40 800',
        sub: '6 800 ₽ / мес · экономия 7 200 ₽',
        badge: 'Скидка 15%',
        features: [
            'Всё из 3-месячного тарифа',
            'Speaking-интенсив раз в месяц',
            'Заморозка подписки до месяца',
            'Сертификат об участии',
        ],
        cta: 'Выбрать →',
        source: 'plan-6',
    },
];

export const Pricing: FC<{ onModal: OpenModal }> = ({ onModal }) => (
    <section id="price" className="wrap reveal">
        <div className="section-eyebrow" style={{ textAlign: 'center' }}>
            — Подписка
        </div>
        <h2 className="section-title center">
            Выбери
            <br />
            <em>свой формат</em>
        </h2>
        <p className="pricing-intro">Чем дольше — тем выгоднее.</p>

        <div className="pricing">
            {PLANS.map((p, i) => (
                <article className={`plan${p.featured ? ' featured' : ''}`} key={i}>
                    {p.featured && <div className="plan-ribbon">Популярный выбор</div>}
                    <div className="plan-eyebrow">Подписка</div>
                    <div className="plan-duration">{p.duration}</div>
                    <p className="plan-for">{p.forText}</p>
                    {p.old ? <div className="plan-old">{p.old}</div> : <div className="plan-old empty">&nbsp;</div>}
                    <div className="plan-amount">
                        {p.amount} <span className="cur">₽</span>
                    </div>
                    <p className="plan-sub">{p.sub}</p>
                    {p.badge && <span className="plan-badge">{p.badge}</span>}

                    <div className="plan-divider" />

                    <ul className="plan-features">
                        {p.features.map((f, j) => (
                            <li key={j}>
                                <span className="check">✓</span>
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>

                    <button type="button" className="plan-cta" onClick={() => onModal(p.source)}>
                        {p.cta}
                    </button>
                </article>
            ))}
        </div>
    </section>
);

/* ===== Персональные занятия ===== */
export const Personal: FC<{ onModal: OpenModal }> = ({ onModal }) => (
    <section id="personal" className="wrap reveal personal">
        <div className="pers-panel">
            <div className="pers-eyebrow">— Индивидуально</div>
            <h2 className="pers-title">
                Персональные
                <br />
                <em>занятия</em>
            </h2>
            <p className="pers-desc">
                Мы выявим вашу зону роста в изучении английского языка, составим персональный план на основе интересующих
                вас тем, учитывая ваш тип восприятия информации, цели и интенсивность занятий.
            </p>
            <div className="pers-tiers">
                <div className="pers-tier">
                    <div className="pers-tier-label">1 занятие</div>
                    <div className="pers-tier-price">4 000 ₽</div>
                </div>
                <div className="pers-tier">
                    <div className="pers-tier-badge">−5%</div>
                    <div className="pers-tier-label">
                        Абонемент
                        <br />4 занятия
                    </div>
                    <div className="pers-tier-price">15 200 ₽</div>
                </div>
                <div className="pers-tier">
                    <div className="pers-tier-badge">−5%</div>
                    <div className="pers-tier-label">
                        Абонемент
                        <br />8 занятий
                    </div>
                    <div className="pers-tier-price">30 400 ₽</div>
                </div>
            </div>
            <p className="pers-note">Все подробности расскажем на бесплатной диагностике вашего текущего уровня.</p>
            <button type="button" className="pers-cta" onClick={() => onModal('personal')}>
                Хочу на персональные занятия
            </button>
        </div>
    </section>
);

/* ===== FAQ ===== */
const FAQ_ITEMS: { q: string; a: JSX.Element }[] = [
    {
        q: 'Какой уровень нужен?',
        a: (
            <>
                Клубы рассчитаны на B1—C1. Объяснения, примеры и контекст помогут вам обогащать ваш словарный запас.
                <br />
                Update подходит и для преподавателей английского: мы отбираем самое интересное для обсуждения на занятиях
                с вашими студентами.
                <br />
                Перед стартом мы проводим короткий тест и подбираем подходящую группу.
            </>
        ),
    },
    {
        q: 'Подойдет ли Update для регулярной практики языка?',
        a: (
            <>
                Да, это 2 в 1: мы отбираем для вас самые актуальные аутентичные материалы для практики чтения и
                аудирования (input) и проводим разговорные клубы, чтобы использовать нашу целевую лексику, делиться
                мнениями, вместе генерировать идеи (output).
                <br />
                Благодаря Update у вас формируется привычка учить английский через современные темы: ежедневные опросы и
                формат микрообучения активируют повторение и долгосрочное запоминание.
            </>
        ),
    },
    {
        q: 'В каком формате приходит материал для изучения?',
        a: (
            <>
                По будням в закрытом телеграм канале вы получаете статьи про тренды и интересные концепции, разбор
                лексики с подробными пояснениями и примерами употребления. После вы получаете квизы с автопроверкой и
                автопояснением для практики лексики.
            </>
        ),
    },
    {
        q: 'Как проходят разговорные клубы?',
        a: (
            <>
                <div>
                    Вы обсуждаете темы в группе до 8-ми человек онлайн в Zoom, преподаватель демонстрирует презентацию с
                    вопросами и активностями.
                </div>
                <div>Длительность 1 клуба составляет до 1,5 часов.</div>
                <div>
                    Во время клуба у вас есть возможность подробно делиться своим мнением благодаря функции «сессионные
                    залы», где вы сможете работать в парах или мини-группах, развивая навык активного слушания и задавая
                    уточняющие вопросы, прямо как в реальной жизни.
                </div>
            </>
        ),
    },
    {
        q: 'Что если я пропускаю клуб?',
        a: (
            <>
                Во время консультации мы уточняем ваше комфортное расписание.
                <br />
                Если не получилось подключиться к клубу онлайн, мы отправим вам видеозапись.
                <br />В тарифах на 3 и 6 месяцев есть возможность заморозки абонемента.
            </>
        ),
    },
];

export const Faq: FC = () => (
    <section id="faq" className="wrap reveal">
        <h2 className="faq-title">FAQ</h2>
        <div className="faq">
            {FAQ_ITEMS.map((item, i) => (
                <details key={i}>
                    <summary>{item.q}</summary>
                    <div className="faq-body">{item.a}</div>
                </details>
            ))}
        </div>
    </section>
);

/* ===== FINAL CTA + FOOTER ===== */
export const FinalFooter: FC<{ onModal: OpenModal }> = ({ onModal }) => (
    <footer className="final">
        <p className="final-quote">boost your English while staying updated</p>

        <button type="button" className="final-cta" onClick={() => onModal('trial')}>
            Попробовать формат
        </button>

        <div className="final-wordmark">UPDATE YOU</div>

        <div className="final-contacts">
            <a href="https://updateyou.ru">updateyou.ru</a>
            <a href="mailto:support@updateyou.ru">support@updateyou.ru</a>
            <a href="#">Telegram</a>
            <a href="https://www.instagram.com/updatenglish/" target="_blank" rel="noopener noreferrer">
                Instagram*
            </a>
        </div>

        <div className="final-legal">
            <div className="final-legal-entity">
                <span>ИП Колесова Алина Рамилевна</span>
                <span>ИНН: 165041280928 · ОГРНИП: 325169000194621</span>
            </div>
            <div className="final-legal-links">
                <a
                    href="https://docs.google.com/document/d/1CVo6bePp1K1I2pJaGMObQQ6vi80fcT_JtaG2djocZHc/edit?tab=t.0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Публичная оферта
                </a>
                <a
                    href="https://docs.google.com/document/d/1AJ2PMCiUEnrkJg_YU4avdkoC3M2kMGTndlJ2rxnemZ8/edit?tab=t.0#heading=h.87jjqkym4at2"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Политика конфиденциальности
                </a>
                <a
                    href="https://docs.google.com/document/d/1VMzHJlCfWyLxlvWYx-FjKN5gwRlLhcROgPvLBnrb5v0/edit?tab=t.0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Согласие на обработку данных
                </a>
                <a
                    href="https://docs.google.com/document/d/16BzzkB8KcSgVxZj3vMHOQIA9tGlmBp1N2oKSsTNK2SY/edit?tab=t.0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Согласие на рекламные рассылки
                </a>
            </div>
            <div className="final-legal-copy">
                <span>© Update</span>
            </div>
        </div>
    </footer>
);
