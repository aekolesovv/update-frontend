import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';
import frameImage from '../../../images/components/frame-2.png';
import plateImage from '../../../images/components/plate.svg';
import cursorImage from '../../../images/icons/cursor.svg';
import dotsImage from '../../../images/components/dots.svg';
import { Tag } from '@/components/Tag/Tag';

export const Features: FC = () => {
    return (
        <div className={styles.container} id="program">
            <h2 className={styles.title}>ПРОГРАММА ОСНОВНОГО КУРСА</h2>

            <div className={styles.content_wrapper}>
                <div className={styles.plate_wrapper}>
                    <Image
                        src={plateImage}
                        alt="Plate illustration"
                        className={styles.plate_image}
                        fill
                    />
                    <div className={styles.menu_content}>
                        <h3 className={styles.menu_title}>MENU</h3>

                        <div className={styles.menu_section}>
                            <h4 className={styles.section_title}>Main course</h4>
                            <ul className={styles.menu_list}>
                                <li>Короткие уроки каждый день</li>
                                <li>Современные темы</li>
                                <li>Telegram-бот + мини-приложение</li>
                                <li>Speaking-практика</li>
                            </ul>
                        </div>

                        <div className={styles.menu_divider}>
                            <Image
                                src={dotsImage}
                                alt="Divider"
                                width={300}
                                height={10}
                                className={styles.dots_image}
                            />
                        </div>

                        <div className={styles.menu_section}>
                            <h4 className={styles.section_title}>Desserts</h4>
                            <ul className={styles.menu_list}>
                                <li>Обучение, встроенное в жизнь</li>
                                <li>Система привычек</li>
                                <li>Трекинга прогресса</li>
                                <li>learners&apos; community</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.buttons_column}>
                    <div className={styles.button_item}>
                        <Image
                            src={frameImage}
                            alt="Button frame"
                            className={styles.button_frame_image}
                            fill
                        />
                        <span className={styles.button_text}>Communication skills</span>
                        <Image
                            src={cursorImage}
                            alt=""
                            width={14}
                            height={24}
                            className={styles.button_cursor}
                            style={{ position: 'absolute' }}
                        />
                    </div>
                    <div className={styles.button_item}>
                        <Image
                            src={frameImage}
                            alt="Button frame"
                            className={styles.button_frame_image}
                            fill
                        />
                        <span className={styles.button_text}>Psychology</span>
                        <Image
                            src={cursorImage}
                            alt=""
                            width={14}
                            height={24}
                            className={styles.button_cursor}
                        />
                    </div>
                    <div className={styles.button_item}>
                        <Image
                            src={frameImage}
                            alt="Button frame"
                            className={styles.button_frame_image}
                            fill
                        />
                        <span className={styles.button_text}>Wellness</span>
                        <Image
                            src={cursorImage}
                            alt=""
                            width={14}
                            height={24}
                            className={styles.button_cursor}
                        />
                    </div>
                    <div className={styles.button_item}>
                        <Image
                            src={frameImage}
                            alt="Button frame"
                            className={styles.button_frame_image}
                            fill
                        />
                        <span className={styles.button_text}>Business</span>
                        <Image
                            src={cursorImage}
                            alt=""
                            width={14}
                            height={24}
                            className={styles.button_cursor}
                        />
                    </div>
                    <div className={styles.button_item}>
                        <Image
                            src={frameImage}
                            alt="Button frame"
                            className={styles.button_frame_image}
                            fill
                        />
                        <span className={styles.button_text}>Fashion</span>
                        <Image
                            src={cursorImage}
                            alt=""
                            width={14}
                            height={24}
                            className={styles.button_cursor}
                        />
                    </div>
                    <div className={styles.button_item}>
                        <Image
                            src={frameImage}
                            alt="Button frame"
                            className={styles.button_frame_image}
                            fill
                        />
                        <span className={styles.button_text}>Cognitive biases</span>
                        <Image
                            src={cursorImage}
                            alt=""
                            width={14}
                            height={24}
                            className={styles.button_cursor}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.tag_wrapper}>
                <Tag
                    text={`подойдет\nдля уровня В1`}
                    width={332}
                    height={89}
                    mWidth={173}
                    mHeight={60}
                />
            </div>
        </div>
    );
};
