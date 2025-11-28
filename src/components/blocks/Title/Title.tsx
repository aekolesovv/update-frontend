import Image from "next/image";
import { FC } from 'react';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import logo from '../../../images/logo/cherry.svg';
import arrowIcon from '../../../images/icons/arrow-down.svg';

export const Title: FC = () => {
    const router = useRouter();

    return (
        <div className={styles.container} id="title">
            <div className={styles.title_wrapper}>
                <div className={styles.logo_group}>
                    <h1 className={styles.title}>Update</h1>
                    <Image
                        src={logo}
                        alt="Update logo"
                        width={80}
                        height={80}
                        className={styles.logo_image}
                    />
                </div>
            </div>

            <div className={styles.tags_container}>
                <span className={`${styles.tag} ${styles.tag_microlearning}`}>microlearning</span>
                <span className={`${styles.tag} ${styles.tag_food}`}>food for thought</span>
                <span className={`${styles.tag} ${styles.tag_trends}`}>hot trends</span>
                <span className={`${styles.tag} ${styles.tag_self}`}>self-improvement</span>
            </div>

            <div className={styles.description_wrapper}>
                <p className={styles.description}>
                    тематические microlearning курсы<br />
                    английского<br />
                    еженедельный дайджест трендов
                </p>
            </div>

            <div className={styles.button_wrapper}>
                <button
                    className={styles.start_button}
                    onClick={() => router.push('/forms/feedback')}
                    type="button"
                >
                    <span className={styles.button_text}>Start here</span>
                    <Image
                        src={arrowIcon}
                        alt="Arrow"
                        width={36}
                        height={36}
                        className={styles.button_arrow}
                    />
                </button>
            </div>
        </div>
    );
};
