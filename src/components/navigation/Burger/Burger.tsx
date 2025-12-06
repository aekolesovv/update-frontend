import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import logo from '../../../images/logo/logo.svg';
import icon from '../../../images/icons/profile.svg';
// import Search from "../Search/Search";
import { useResize } from '@/hooks/useResize';
import styles from './style.module.scss';

interface BurgerProps {
    isPopupOpen: boolean;
    switchPopup: () => void;
}

export const Burger: FC<BurgerProps> = ({ isPopupOpen, switchPopup }) => {
    const { width } = useResize();

    const [values, setValues] = useState('');
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.value;
        setValues(value);
    };

    const setSearchClose = () => {
        setIsOpenSearch(false);
    };

    const handleLinkClick = () => {
        switchPopup();
    };

    useEffect(() => {
        if (values.length > 0) {
            setIsOpenSearch(true);
        }
        if (values.length < 1) {
            setIsOpenSearch(false);
        }
    }, [values]);

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
                                alt="Логотип"
                                src={logo}
                                onClick={switchPopup}
                            />
                        </Link>
                        <div className={styles.burger_links__wrapper}>
                            {/* <Image
                className={styles.header__search_button_search}
                src={loop_small}
                alt="Кнопка поиска"
                onClick={switchPopup}
              /> */}
                            <Link href="/profile">
                                <Image
                                    className={styles.header__profile_icon}
                                    alt="Иконка с профилем"
                                    src={icon}
                                    onClick={switchPopup}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.burger__links_container}>
                        <Link href="/" className={styles.burger__link} onClick={handleLinkClick}>
                            Главная
                        </Link>
                        <li className={styles.hover__link}>
                            Каталог
                            <ul className={styles.hover__menu}>
                                <div className={styles.hover__menu_container}>
                                    <Link
                                        href="/catalog/three-layer-panels"
                                        className={styles.burger__link}
                                        onClick={handleLinkClick}
                                    >
                                        Трёхслойные сэндвич-панели
                                    </Link>
                                    <Link
                                        href="/catalog/roof-panels"
                                        className={styles.burger__link}
                                        onClick={handleLinkClick}
                                    >
                                        Кровельные сэндвич-панели
                                    </Link>
                                    <Link
                                        href="/catalog/wall-panels"
                                        className={styles.burger__link}
                                        onClick={handleLinkClick}
                                    >
                                        Стеновые сэндвич-панели
                                    </Link>
                                    <Link
                                        href="/catalog/components"
                                        className={styles.burger__link}
                                        onClick={handleLinkClick}
                                    >
                                        Комплектующие{width < 374 ? <br /> : ''}для сэндвич-панелей
                                    </Link>
                                </div>
                            </ul>
                        </li>
                        <Link href="/forms/feedback" className={styles.burger__link}>
                            Рассчитать цену
                        </Link>
                        <Link
                            href="/#gift"
                            className={`${styles.burger__link} ${styles.burger__link_orange}`}
                        >
                            Получить подарок
                        </Link>
                        <Link
                            href="/contacts"
                            className={styles.burger__link}
                            onClick={handleLinkClick}
                        >
                            Контакты
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
