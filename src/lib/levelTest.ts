/* ============================================================
   Update You — English Level Test engine (ported from level-test.js)
   Skills: grammar | vocab | reading | listening | speaking
   CEFR difficulty weights: A2=1, B1=2, B1+=3, B2=4, B2+=5, C1=6
   ============================================================ */

export type Skill = 'grammar' | 'vocab' | 'reading' | 'listening' | 'speaking';
export type GradedSkill = 'grammar' | 'vocab' | 'reading' | 'listening';

export interface Question {
    skill: Skill;
    level: number;
    lvl: string;
    prompt: string;
    options?: string[];
    answer?: number;
    passage?: string;
    audio?: string;
    speaking?: boolean;
    sub?: string;
}

export interface Band {
    code: string;
    name: string;
    summary: string;
    fit: string;
    club: string;
}

export const LS_KEY = 'uy_level_test_v1';
export const LS_LEAD_KEY = 'uy_level_test_lead';

export const QUESTIONS: Question[] = [
    // --- Grammar ---
    { skill: 'grammar', level: 2, lvl: 'B1', prompt: 'If I {gap} more free time, I would travel every month.', options: ['had', 'have', 'will have', 'would have'], answer: 0 },
    { skill: 'grammar', level: 3, lvl: 'B1+', prompt: "I'm not used to {gap} up this early.", options: ['wake', 'waking', 'woke', 'be woken'], answer: 1 },
    { skill: 'grammar', level: 4, lvl: 'B2', prompt: 'By the time we arrived, the meeting {gap}.', options: ['had already started', 'already started', 'has already started', 'was already start'], answer: 0 },
    { skill: 'grammar', level: 5, lvl: 'B2+', prompt: 'She insisted {gap} paying for everyone.', options: ['on', 'in', 'to', 'about'], answer: 0 },
    { skill: 'grammar', level: 6, lvl: 'C1', prompt: '{gap} harder, he would have passed the interview.', options: ['Had he prepared', 'If he prepared', 'Should he prepare', 'Were he prepare'], answer: 0 },

    // --- Vocabulary / collocations ---
    { skill: 'vocab', level: 2, lvl: 'B1', prompt: 'We need to {gap} a decision before Friday.', options: ['make', 'do', 'take', 'have'], answer: 0 },
    { skill: 'vocab', level: 4, lvl: 'B2', prompt: 'The deal fell {gap} at the last minute.', options: ['through', 'out', 'over', 'off'], answer: 0 },
    { skill: 'vocab', level: 5, lvl: 'B2+', prompt: 'Without any evidence, his accusation was completely {gap}.', options: ['groundless', 'grounded', 'underground', 'down-to-earth'], answer: 0 },
    { skill: 'vocab', level: 6, lvl: 'C1', prompt: 'She gave a {gap} account of the negotiation — every detail, step by step.', options: ['blow-by-blow', 'blown-up', 'blow-out', 'far-fetched'], answer: 0 },

    // --- Reading ---
    { skill: 'reading', level: 3, lvl: 'B1+', passage: '“Sorry I’m late — the meeting ran over and then the trains were a nightmare. I did text you, but it clearly didn’t go through.”', prompt: 'Why didn’t the listener get a message?', options: ['The text was never delivered', 'The speaker forgot to write it', 'The speaker called instead', 'The phone was switched off'], answer: 0 },
    { skill: 'reading', level: 5, lvl: 'B2+', passage: '“The launch was, to put it mildly, underwhelming. Few showed up, and those who did seemed more curious than convinced.”', prompt: 'How does the writer feel about the launch?', options: ['Disappointed by it', 'Thrilled with it', 'Indifferent and unaware', 'Surprised it sold out'], answer: 0 },

    // --- Listening (read aloud by speech synthesis) ---
    { skill: 'listening', level: 2, lvl: 'B1', audio: 'The store closes at half past seven on weekdays.', prompt: 'What time does the store close on weekdays?', options: ['7:30', '7:15', '8:30', '6:45'], answer: 0 },
    { skill: 'listening', level: 4, lvl: 'B2', audio: "I'd rather we didn't bring that up at dinner tonight.", prompt: 'What does the speaker mean?', options: ['Please don’t mention that topic at dinner', 'Let’s definitely discuss it at dinner', 'Bring more food to dinner', 'Cancel the dinner tonight'], answer: 0 },
    { skill: 'listening', level: 5, lvl: 'B2+', audio: 'Honestly, she pulled it off despite all the odds.', prompt: 'What is the speaker saying about her?', options: ['She succeeded even though it was unlikely', 'She gave up halfway through', 'She was lucky to be chosen', 'She refused to take part'], answer: 0 },

    // --- Speaking (optional, not auto-graded) ---
    { skill: 'speaking', level: 0, lvl: '', speaking: true, prompt: 'Расскажи о своих планах на выходные — по-английски, 20–30 секунд.', sub: 'Задание по желанию. Запись услышит преподаватель на диагностике и оценит произношение и беглость — то, что текстовый тест не покажет. Можно пропустить.' },
];

export const GRADED = QUESTIONS.filter(q => !q.speaking);
export const MAX_SCORE = GRADED.reduce((s, q) => s + q.level, 0);

export const SKILL_LABELS: Record<Skill, string> = {
    grammar: 'Грамматика',
    vocab: 'Лексика',
    reading: 'Чтение',
    listening: 'Аудирование',
    speaking: 'Устная речь',
};

export const BANDS: Record<string, Band> = {
    A2: {
        code: 'A2',
        name: 'Pre-Intermediate',
        summary:
            'Ты уверенно держишь базу, но для свободного разговора не хватает грамматических конструкций и активной лексики. Хорошая новость: с этого уровня прогресс самый заметный.',
        fit: 'Старт: регулярная практика',
        club: 'Тебе подойдёт мягкий вход — клубы B1 с поддержкой куратора.',
    },
    B1_1: {
        code: 'B1.1',
        name: 'Intermediate',
        summary:
            'Ты понимаешь больше, чем можешь сказать. Грамматика в целом есть, но в речи рассыпается. Нужна регулярная разговорная практика, чтобы пассивные знания стали активными.',
        fit: 'Клубы B1—B2',
        club: 'Разговорные клубы B1—B2 — твой формат: говорить, а не учить правила.',
    },
    B1_2: {
        code: 'B1.2',
        name: 'Intermediate +',
        summary:
            'Крепкий B1. Базовые темы даются легко, но на сложных конструкциях и идиомах появляется неуверенность. Тебе нужен объём живой практики, чтобы выйти на B2.',
        fit: 'Клубы B1—B2',
        club: 'Клубы B1—B2 дадут тот объём речи, которого не хватает для скачка.',
    },
    B2_1: {
        code: 'B2.1',
        name: 'Upper-Intermediate',
        summary:
            'Ты уже свободно говоришь на знакомые темы, но в спонтанной речи и на абстрактных темах теряешь точность и беглость. Это «последняя миля» к настоящей свободе.',
        fit: 'Клубы B2—C1',
        club: 'Клубы B2—C1 на актуальные темы — чтобы отполировать беглость и точность.',
    },
    B2_2: {
        code: 'B2.2',
        name: 'Upper-Intermediate +',
        summary:
            'Сильный B2. Ты хорошо справляешься почти везде, но до C1 не хватает нюансов: идиоматичности, регистра, лёгкости в сложных дискуссиях.',
        fit: 'Клубы B2—C1',
        club: 'Продвинутые клубы B2—C1 помогут добрать нюансы и звучать естественно.',
    },
    C1: {
        code: 'C1',
        name: 'Advanced',
        summary:
            'Отличный результат — уровень свободного владения. Тебе важно не растерять форму и продолжать говорить на сложные темы, иначе навык откатывается. Поддерживающая практика решает.',
        fit: 'Клубы C1 / Speaking-интенсив',
        club: 'Продвинутые C1-клубы и speaking-интенсив удержат и разовьют уровень.',
    },
};

export const bandFor = (pct: number): Band => {
    if (pct < 0.3) return BANDS.A2;
    if (pct < 0.45) return BANDS.B1_1;
    if (pct < 0.6) return BANDS.B1_2;
    if (pct < 0.74) return BANDS.B2_1;
    if (pct < 0.88) return BANDS.B2_2;
    return BANDS.C1;
};

export interface SkillScore {
    got: number;
    max: number;
}

export interface TestResult {
    score: number;
    pct: number;
    band: Band;
    perSkill: Partial<Record<Skill, SkillScore>>;
}

export const computeResult = (answers: Record<number, number>): TestResult => {
    let score = 0;
    const perSkill: Partial<Record<Skill, SkillScore>> = {};
    QUESTIONS.forEach((q, idx) => {
        if (q.speaking) return;
        const cur = perSkill[q.skill] ?? { got: 0, max: 0 };
        cur.max += q.level;
        if (answers[idx] === q.answer) {
            score += q.level;
            cur.got += q.level;
        }
        perSkill[q.skill] = cur;
    });
    const pct = MAX_SCORE ? score / MAX_SCORE : 0;
    return { score, pct, band: bandFor(pct), perSkill };
};

export const skillRec = (skill: GradedSkill, ratio: number): { h: string; p: string } => {
    const weak = ratio < 0.6;
    const map: Record<GradedSkill, { h: string; p: string }> = {
        grammar: weak
            ? { h: 'Грамматика в речи', p: 'Конструкции есть в теории, но «сыпятся» в спонтанной речи. Нужна не зубрёжка правил, а отработка в живом разговоре — когда мозг сам достаёт нужную форму.' }
            : { h: 'Грамматика — твоя сильная сторона', p: 'База крепкая. Дальше — усложнять: условные, инверсии, сложные времена в реальных диалогах, а не в упражнениях.' },
        vocab: weak
            ? { h: 'Активная лексика и коллокации', p: 'Слова узнаёшь, но в речь они не приходят. Решает погружение в темы и работа с коллокациями — устойчивыми сочетаниями, которые звучат естественно.' }
            : { h: 'Лексика на хорошем уровне', p: 'Запас широкий. Следующий шаг — идиоматичность и точность: разница между «правильно» и «как говорит носитель».' },
        reading: weak
            ? { h: 'Понимание контекста', p: 'С прямым смыслом всё ок, но подтекст и тон считываются не всегда. Помогает разбор аутентичных текстов о трендах и событиях — ровно то, что мы делаем в клубах.' }
            : { h: 'Чтение и понимание — сильно', p: 'Ты улавливаешь нюансы и подтекст. Это отличная база, чтобы переносить тот же уровень понимания в собственную речь.' },
        listening: weak
            ? { h: 'Восприятие на слух', p: 'Беглую и идиоматичную речь поймать сложнее, чем учебную. Регулярное аудирование живой речи и разговор с разными собеседниками быстро это чинят.' }
            : { h: 'Аудирование — уверенно', p: 'Ты хорошо понимаешь на слух, включая идиомы. Дальше — тренировать скорость реакции в живом диалоге.' },
    };
    return map[skill];
};

/** +7 (XXX) XXX-XX-XX progressive mask. */
export const formatPhone = (raw: string): string => {
    let d = raw.replace(/\D/g, '');
    if (d.length && d[0] === '8') d = '7' + d.slice(1);
    if (!d.length) return '';
    if (d[0] !== '7') d = '7' + d;
    d = d.slice(0, 11);
    let out = '+7';
    if (d.length > 1) out += ' (' + d.slice(1, 4);
    if (d.length >= 4) out += ')';
    if (d.length >= 5) out += ' ' + d.slice(4, 7);
    if (d.length >= 8) out += '-' + d.slice(7, 9);
    if (d.length >= 10) out += '-' + d.slice(9, 11);
    return out;
};

export const phoneDigits = (v: string): string => (v || '').replace(/\D/g, '');
