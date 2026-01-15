import Image from 'next/image';
import { FC, useState } from 'react';
import styles from './style.module.scss';
import { CustomButton } from '@/components/custom_components/CustomButton/CustomButton';
import { PlugPopup } from '@/components/PlugPopup/PlugPopup';
import { Tag } from '@/components/Tag/Tag';
import screenshot1 from '../../../images/welness_page/Снимок экрана 2026-01-07 в 14.03.24.png';
import screenshot2 from '../../../images/welness_page/Снимок экрана 2026-01-07 в 14.04.04.png';
import gif2 from '../../../images/welness_page/gifupdatewebsite2online_video_cutter_com_ezgif_com_video_to_gif.gif';
import gif3 from '../../../images/welness_page/IdentifyingEnergyGiversandTakersinOurLivesonline_video_cutter_com1.gif';

export const WellnessCourse: FC = () => {
    const [isPlugPopupOpened, setIsPlugPopupOpened] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.content_wrapper}>
                <h2 className={styles.title}>WELCOME TO OUR WELLNESS COURSE</h2>

                <div className={styles.panels_wrapper}>
                    {/* Левая панель */}
                    <div className={styles.panel}>
                        <div className={styles.panel_content}>
                            <h3 className={styles.panel_header}>
                                Индустрия wellness стремительно растёт. В этой гонке саморазвития вернёмся к основам нашего состояния.
                            </h3>
                            <p className={styles.panel_text}>
                                С помощью курса вы сможете:
                            </p>
                            <ul className={styles.panel_list}>
                                <li>говорить о morning rituals, habits, energy givers и energy takers и объяснять, как они влияют на ваше самочувствие</li>
                                <li>обсуждать nutrition, разбирать принципы питания в blue zones</li>
                                <li>применять принципы holistic health в своей жизни</li>
                                <li>практиковать breathwork</li>
                                <li>читать о трендах в biohacking</li>
                            </ul>
                        </div>
                        <div className={styles.panel_icon}>
                            <CustomButton
                                buttonText=""
                                type="button"
                                className={styles.icon_button}
                            />
                        </div>
                    </div>

                    {/* Средняя панель */}
                    <div className={styles.panel}>
                        <div className={styles.panel_content}>
                            <h3 className={styles.panel_header}>
                                Этот курс для тех, кто устал от хаоса, хочет говорить о wellness на современном английском, и встроить обучение в реальную жизнь, а не в список «когда-нибудь».
                            </h3>
                            <div className={styles.image_wrapper}>
                                <Image
                                    src={gif2}
                                    alt="Energy givers and takers"
                                    width={300}
                                    height={400}
                                    className={styles.panel_image}
                                />
                            </div>
                            <div className={styles.image_wrapper}>
                                <Image
                                    src={gif3}
                                    alt="Identifying energy givers and takers"
                                    width={300}
                                    height={400}
                                    className={styles.panel_image}
                                />
                            </div>
                        </div>
                        <div className={styles.panel_icon}>
                            <CustomButton
                                buttonText=""
                                type="button"
                                className={styles.icon_button}
                            />
                        </div>
                    </div>

                    {/* Правая панель */}
                    <div className={styles.panel}>
                        <div className={styles.tag_wrapper}>
                            <Tag
                                text={`I'm ready to join!\nХочу выбрать тариф`}
                                width={300}
                                height={90}
                                mWidth={200}
                                mHeight={60}
                                tailLeft={false}
                            />
                        </div>
                        <div className={styles.panel_content}>
                            <div className={styles.image_wrapper}>
                                <Image
                                    src={screenshot1}
                                    alt="Wellness курс скриншот 1"
                                    width={150}
                                    height={180}
                                    className={styles.panel_image}
                                />
                            </div>
                            <div className={styles.image_wrapper}>
                                <Image
                                    src={screenshot2}
                                    alt="Wellness курс скриншот 2"
                                    width={150}
                                    height={180}
                                    className={styles.panel_image}
                                />
                            </div>
                        </div>
                        <div className={styles.panel_icon}>
                            <CustomButton
                                buttonText=""
                                type="button"
                                className={styles.icon_button}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.button_wrapper}>
                    <CustomButton
                        buttonText="Хочу выбрать тариф"
                        type="button"
                        handleButtonClick={() => setIsPlugPopupOpened(true)}
                    />
                </div>
            </div>
            <PlugPopup
                isOpened={isPlugPopupOpened}
                setIsOpened={setIsPlugPopupOpened}
                title="Выбрать тариф"
            />
        </div>
    );
};

