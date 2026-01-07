import Image from "next/image";
import { FC, useState } from 'react';
import styles from './style.module.scss';
import logo from '../../../images/logo/cherry.svg';
import pointerIcon from '../../../images/icons/pointer.svg';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import { PlugPopup } from '@/components/PlugPopup/PlugPopup';

export const Title: FC = () => {
    const [isPlugPopupOpened, setIsPlugPopupOpened] = useState(false);

    return (
        <div className={styles.container} id="title">
            <div className={styles.title_wrapper}>
                <div className={styles.logo_group}>
                    <h1 className={styles.title}>Update</h1>
                    <Image
                        src={logo}
                        alt="Логотип школы английского Update"
                        width={80}
                        height={80}
                        className={styles.logo_image}
                    />
                </div>
            </div>

            <div className={styles.tags_container}>
                <span className={`${styles.tag} ${styles.tag_microlearning}`}>
                    microlearning
                    <Image
                        src={pointerIcon}
                        alt="Стрелка‑указатель рядом с тегом"
                        width={17.3}
                        height={43.9}
                        className={styles.tag_cursor}
                    />
                </span>
                <span className={`${styles.tag} ${styles.tag_food}`}>
                    food for thought
                    <Image
                        src={pointerIcon}
                        alt="Стрелка‑указатель рядом с тегом"
                        width={17.3}
                        height={43.9}
                        className={styles.tag_cursor}
                    />
                </span>
                <span className={`${styles.tag} ${styles.tag_trends}`}>
                    hot trends
                    <Image
                        src={pointerIcon}
                        alt="Стрелка‑указатель рядом с тегом"
                        width={17.3}
                        height={43.9}
                        className={styles.tag_cursor}
                    />
                </span>
                <span className={`${styles.tag} ${styles.tag_self}`}>
                    self-improvement
                    <Image
                        src={pointerIcon}
                        alt="Стрелка‑указатель рядом с тегом"
                        width={17.3}
                        height={43.9}
                        className={styles.tag_cursor}
                    />
                </span>
            </div>

            <div className={styles.description_wrapper}>
                <p className={styles.description}>
                    тематические microlearning курсы английского<br /> еженедельный дайджест трендов
                </p>
            </div>

            <div className={styles.button_wrapper}>
                <CustomButton
                    buttonText="Бесплатный демо-урок"
                    type="button"
                    className={styles.button}
                    handleButtonClick={() => setIsPlugPopupOpened(true)}
                />
            </div>
            <PlugPopup
                isOpened={isPlugPopupOpened}
                setIsOpened={setIsPlugPopupOpened}
                title="Запись на бесплатный демо-урок"
            />
        </div>
    );
};
