import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useResize } from '../../../hooks/useResize';
import logo from '../../../images/logo/logo.svg';
import { selectUser } from '../../../services/redux/slices/user/user';
import { useAppSelector } from '../../../services/typeHooks';
import { BurgerButton } from '../../navigation/BurgerButton/BurgerButton';
import styles from './style.module.scss';

const Header: FC = () => {
    const user = useAppSelector(selectUser);
    const router = useRouter();

    const [values, setValues] = useState('');
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.value;
        setValues(value);
    };

    const { width } = useResize();

    const setSearchClose = () => {
        setIsOpenSearch(false);
    };

    useEffect(() => {
        if (values.length > 0) {
            setIsOpenSearch(true);
        }
        if (values.length < 1) {
            setIsOpenSearch(false);
        }
    }, [values]);

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
                            href="/#gift"
                            className={`${styles.header__link} ${is_active('/') ? styles.active : ''}`}
                        >
                            Какие-то ссылки
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
