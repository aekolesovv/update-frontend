import { useRouter } from 'next/router';
import { FC, useEffect, ReactNode, CSSProperties } from 'react';
import styles from './style.module.scss';

interface IPopup {
    title?: string;
    text?: string | JSX.Element[];
    link?: string;
    isOpened: boolean;
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
    children?: ReactNode;
    style?: CSSProperties;
}

const Popup: FC<IPopup> = ({ title, text, isOpened, link, setIsOpened, children, style }) => {
    const router = useRouter();

    const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = evt => {
        if (evt.target === evt.currentTarget) {
            setIsOpened(false);
        }
    };

    useEffect(() => {
        const handleEscClick = (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                setIsOpened(false);
            }
        };

        document.addEventListener('keydown', handleEscClick);

        return () => document.removeEventListener('keydown', handleEscClick);
    }, [setIsOpened]);

    useEffect(() => {
        const body = document.querySelector('body');
        if (isOpened) {
            body?.classList.add(styles.bodyScrollLock);
        } else {
            body?.classList.remove(styles.bodyScrollLock);
        }
    }, [isOpened]);

    const handleClickClose = () => {
        setIsOpened(false);
        if (link) {
            router.push(link);
        }
    };

    return (
        <div
            className={`${styles.popup} ${isOpened ? styles.popup_opened : ''}`}
            onClick={handleOverlayClick}
        >
            <div className={styles.popup__container} style={style}>
                <button
                    type="button"
                    className={styles.btn_close}
                    onClick={() => setIsOpened(false)}
                ></button>
                <h4 className={styles.popup__title}>{title}</h4>
                {children ? (
                    children
                ) : (
                    <>
                        <p className={styles.popup__text}>{text}</p>
                        <button className={styles.popup__close} onClick={handleClickClose}>
                            Закрыть
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Popup;
