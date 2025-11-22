import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useResize } from '../../../hooks/useResize';
import logo from '../../../images/logo/logo.svg';
import { useAppDispatch } from '../../../services/typeHooks';
import styles from './style.module.scss';

const Footer: FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { width } = useResize();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <Image className={styles.footer__logo} alt="Логотип BAYAR" src={logo} />
                <Link href="/" className={styles.text}>
                    Главная
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
