import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useResize } from '../../../hooks/useResize';
import logo from '../../../images/logo/logo.svg';
import { BurgerButton } from '../../navigation/BurgerButton/BurgerButton';
import styles from './style.module.scss';

const Header: FC = () => {
    const router = useRouter();
    const { width } = useResize();

    const [isPopupOpen, setIsPopupOpen] = useState(false); // Burger

    const switchPopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const is_active = (path: string) => {
        return router.pathname === path;
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Link href="/">
                    <Image className={styles.header__logo} alt="Логотип" src={logo} />
                </Link>
                {width < 1023 && (
                    <div className={styles.header__burger__container}>
                        <BurgerButton isPopupOpen={isPopupOpen} switchPopup={switchPopup} />
                    </div>
                )}
                {width > 1023 && (
                    <div className={styles.header__links}>
                        <Link
                            href="/#program"
                            className={`${styles.header__link} ${is_active('/') ? styles.active : ''}`}
                        >
                            программа
                        </Link>
                        <Link
                            href="/#tariffs"
                            className={`${styles.header__link} ${is_active('/') ? styles.active : ''}`}
                        >
                            тарифы
                        </Link>
                        <Link
                            href="/#digest"
                            className={`${styles.header__link} ${is_active('/') ? styles.active : ''}`}
                        >
                            дайджест
                        </Link>
                        <Link
                            href="/#support"
                            className={`${styles.header__link} ${is_active('/') ? styles.active : ''}`}
                        >
                            поддержка
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
