import Image from 'next/image';
import pointerIcon from '../../../images/icons/black-pointer.svg';
import { FC } from 'react';
import styles from './style.module.scss';
import windowImage from '../../../images/components/window.svg';
import chatImage from '../../../images/components/chat.svg';

export const WhyUs: FC = () => {
    return (
        <div className={styles.container} id="why-us">
            <h2 className={styles.title}>Подход, который приносит результат</h2>
            <div className={styles.window_item}>
                <div className={styles.window_wrapper}>
                    <Image
                        src={windowImage}
                        alt="Window illustration"
                        className={styles.window_image}
                        fill
                    />
                    <div className={styles.window_content}>
                        <p className={styles.window_text}>
                            Наш главный принцип— <span className={styles.highlight}>cherry-pick<Image
                                src={pointerIcon}
                                alt=""
                                width={31}
                                height={31}
                                className={styles.tag_cursor}
                            /></span>
                            <br />
                            — только самое актуальное и<br />
                            нужное по конкретным темам
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.window_item_second}>
                <div className={styles.window_wrapper_second}>
                    <Image
                        src={windowImage}
                        alt="Window illustration"
                        className={styles.window_image}
                        fill
                    />
                    <div className={styles.window_content}>
                        <p className={styles.window_text}>
                            Благодаря лаконичным видео материалам<br />
                            обучение легко вписать в <span className={styles.highlight}>busy</span> график
                        </p>
                        <div className={styles.skills_list}>
                            <p className={styles.skill_line}>
                                Оставаться <span className={styles.highlight}>on top of your game:</span>
                            </p>
                            <p className={styles.skill_line}>
                                прокачивать <span className={styles.highlight}>soft skills</span>
                            </p>
                            <p className={styles.skill_line}>
                                узнавать <span className={styles.highlight}>best practices</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.comment_wrapper}>
                <div className={styles.comment}>
                    <Image
                        src={chatImage}
                        alt="Comment tag"
                        className={styles.comment_image}
                        fill
                    />
                    <span className={styles.comment_text}>oh it&apos;s match!</span>
                </div>
            </div>
        </div>
    );
};

