import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';
import alexImage from '../../../images/components/alex.png';
import maryImage from '../../../images/components/mary.png';
import alinaImage from '../../../images/components/alina.png';

export const AboutUs: FC = () => {
	return (
		<div className={styles.container} id="about-us">
			<h2 className={styles.title}>СТАРАЕМСЯ ДЛЯ ВАС</h2>

			<div className={styles.content}>
				{/* ALINA Card */}
				<div className={styles.card}>
					<div className={styles.card_content}>
						<div className={styles.tags_row}>
							<span className={styles.tag}>level C2</span>
							<span className={styles.tag}>XP</span>
						</div>
						<h3 className={styles.name}>ALINA</h3>
						<p className={styles.description}>
							Помогает звучать уверенно на подкастах, встречах и деловых поездках, обсуждая самые hot trends
						</p>

						<div className={styles.section}>
							<span className={styles.section_label}>background</span>
							<p className={styles.section_text}>
								учила английский на Мальте, Кипре,<br />
								в Ирландии<br />
								русско-английский бакалавриат<br />
								курсы по преподаванию высоким уровням
							</p>
						</div>

						<div className={styles.section}>
							<span className={styles.section_label}>TESOL: grade A</span>
						</div>

						<div className={styles.section}>
							<span className={styles.section_label}>ultimate skill</span>
							<p className={styles.section_text}>
								Алина превращает speaking-сессию в поток, где каждое обсуждение адаптируется под вас и ваши цели.
							</p>
						</div>
					</div>
					<div className={styles.image_wrapper}>
						<Image
							src={alinaImage}
							alt="Alina"
							width={218}
							height={381}
							className={styles.image}
						/>
					</div>
				</div>

				{/* ALEX Card */}
				<div className={`${styles.card} ${styles.card_alex}`}>
					<div className={styles.card_content}>
						<h3 className={styles.name}>ALEX</h3>
						<span className={styles.section_label}>Risk Guardian</span>
						<p className={styles.description}>
							Держит щит над проектом, когда приходят риски: финансовые, маркетинговые или продуктовые.<br /><br />
							Играет на нескольких досках одновременно, выстраивает стратегии так, чтобы команда шла вперёд без фатальных ловушек.
						</p>
					</div>
					<div className={styles.image_wrapper}>
						<Image
							src={alexImage}
							alt="Alex"
							width={382}
							height={372}
							className={styles.image}
						/>
					</div>
				</div>

				{/* MARY Card */}
				<div className={styles.card}>
					<div className={styles.card_content}>
						<div className={styles.tags_row}>
							<span className={styles.tag}>level C2</span>
							<span className={styles.tag}>XP</span>
						</div>
						<h3 className={styles.name}>MARY</h3>
						<p className={styles.description}>
							Работает с теми, кто ценит смысл и стиль. Вела на английском клуб дебатов и киноклуб, где мы обсуждали самые bold идеи и тренды
						</p>

						<div className={styles.section}>
							<span className={styles.section_label}>background</span>
							<p className={styles.section_text}>
								лингвист-переводчик по образованию<br />
								курсы по преподаванию высоким уровням<br />
								жила заграницей
							</p>
						</div>

						<div className={styles.section}>
							<span className={styles.section_label}>ultimate skill</span>
							<p className={styles.section_text}>
								Мэри хронически онлайн, чтобы вам не приходилось. Знает, что любая тема может стать thought-provoking
							</p>
						</div>
					</div>
					<div className={styles.image_wrapper}>
						<Image
							src={maryImage}
							alt="Mary"
							width={218}
							height={381}
							className={styles.image}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

