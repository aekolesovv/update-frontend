import Image from 'next/image';
import { FC } from 'react';
import cherryLogo from '../../../images/logo/cherry.svg';
import styles from './style.module.scss';

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
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
            </div>
        </footer>
    );
};

export default Footer;
