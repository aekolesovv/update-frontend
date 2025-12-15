import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';

interface ContactsProps {
    src: string;
    text: string;
    f_size?: string;
    i_size?: string;
    type?: 'mail' | 'phone' | 'default';
}

export const Contacts: FC<ContactsProps> = ({ src, text, f_size, i_size, type = 'default' }) => {
    const handleClick = () => {
        if (type === 'mail') {
            window.open(`mailto:${text}`, '_blank');
        } else if (type === 'phone') {
            window.open(`tel:${text}`, '_blank');
        }
    };

    return (
        <div
            className={styles.container}
            onClick={handleClick}
            style={{ cursor: type !== 'default' ? 'pointer' : 'default' }}
        >
            <Image style={{ width: i_size, height: i_size }} alt="Иконка типа контакта (почта или телефон)" src={src} />
            <p className={styles.text} style={{ fontSize: f_size }}>
                {text}
            </p>
        </div>
    );
};
