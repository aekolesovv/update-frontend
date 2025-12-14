import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import cherryLogo from '../../../images/logo/cherry.svg';
import instagramIcon from '../../../images/logo/Instagram.svg';
import telegramIcon from '../../../images/logo/telegram.svg';
import styles from './style.module.scss';

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Левая колонка: Соцсети, Логотип, Копирайт */}
                    <div className={styles.left_section}>
                        <div className={styles.social_icons}>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.social_icon}
                            >
                                <Image src={instagramIcon} alt="Instagram" width={77} height={77} className={styles.social_icon_img} />
                            </a>
                            <a
                                href="https://t.me"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.social_icon}
                            >
                                <Image src={telegramIcon} alt="Telegram" width={77} height={77} className={styles.social_icon_img} />
                            </a>
                        </div>
                        <div className={styles.logo_group}>
                            <h1 className={styles.logo_text}>Update</h1>
                            <Image
                                src={cherryLogo}
                                alt="Update logo"
                                width={56}
                                height={56}
                                className={styles.logo_image}
                            />
                        </div>
                        <p className={styles.copyright}>@2025 Все права защищены</p>
                    </div>

                    {/* Средняя колонка: Реквизиты */}
                    <div className={styles.middle_section}>
                        <h2 className={styles.section_title}>Реквизиты</h2>
                        <div className={styles.details_list}>
                            <p className={styles.detail_item}>Ип Иванов Иван иванович</p>
                            <p className={styles.detail_item}>ИНН: 0000000000</p>
                            <p className={styles.detail_item}>ОГРНИП: 000000000000</p>
                            <p className={styles.detail_item}>г. Казань, Пушкинская</p>
                        </div>
                    </div>

                    {/* Правая колонка: Условия и положения */}
                    <div className={styles.right_section}>
                        <h2 className={styles.section_title}>Условия и положения</h2>
                        <div className={styles.links_list}>
                            <Link href="/privacy" className={styles.footer_link}>
                                Политика конфиденциальности
                            </Link>
                            <Link href="/offer" className={styles.footer_link}>
                                Публичная оферта
                            </Link>
                            <Link href="/advertising-consent" className={styles.footer_link}>
                                Согласие на получение рекламных
                            </Link>
                            <Link href="/personal-data-consent" className={styles.footer_link}>
                                Согласие на обработку персональных
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
