import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import logo from '../../../images/logo/logo.svg';
import styles from './style.module.scss';

interface BurgerProps {
    isPopupOpen: boolean;
    switchPopup: () => void;
}

export const Burger: FC<BurgerProps> = ({ isPopupOpen, switchPopup }) => {
    const handleLinkClick = () => {
        switchPopup();
    };

    useEffect(() => {
        if (isPopupOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPopupOpen]);

    return (
        <div className={`${styles.burger} ${isPopupOpen ? styles.burger_opened : ''}`}>
            <div className={styles.burger__content}>
                <div className={styles.burger__container}>
                    <div className={styles.burger_header__container}>
                        <button
                            className={styles.burger__close}
                            type="button"
                            onClick={switchPopup}
                        />
                        <Link href="/">
                            <Image
                                className={styles.header__logo}
                                alt="Логотип Update в мобильном меню"
                                src={logo}
                                onClick={switchPopup}
                            />
                        </Link>
                    </div>
                    <div className={styles.burger__links_container}>
                        <Link
                            href="/#program"
                            className={styles.burger__link}
                            onClick={handleLinkClick}
                        >
                            программа
                        </Link>
                        <Link
                            href="/#tariffs"
                            className={styles.burger__link}
                            onClick={handleLinkClick}
                        >
                            тарифы
                        </Link>
                        <Link
                            href="/#digest"
                            className={styles.burger__link}
                            onClick={handleLinkClick}
                        >
                            дайджест
                        </Link>
                        <Link
                            href="/#support"
                            className={styles.burger__link}
                            onClick={handleLinkClick}
                        >
                            поддержка
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
