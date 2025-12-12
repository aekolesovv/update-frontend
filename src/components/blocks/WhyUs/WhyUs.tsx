import Image from 'next/image';
import pointerIcon from '../../../images/icons/black-pointer.svg';
import { FC } from 'react';
import styles from './style.module.scss';
import { Tag } from '@/components/Tag/Tag';
import { Window } from '@/components/Window/Window';

export const WhyUs: FC = () => {
    return (
        <div className={styles.container} id="why-us">
            <h2 className={styles.title}>Подход, который приносит результат</h2>
            <div className={styles.window_item}>
                <Window width={467} height={276} mWidth={284} mHeight={145}>
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
                </Window>
            </div>

            <div className={styles.window_item_second}>
                <Window width={544} height={327} mWidth={284} mHeight={201}>
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
                </Window>
            </div>

            <div className={styles.tag_wrapper}>
                <Tag
                    text="oh it’s match!"
                    width={230}
                    height={65}
                    mWidth={138}
                    mHeight={40}
                />
            </div>
        </div>
    );
};

