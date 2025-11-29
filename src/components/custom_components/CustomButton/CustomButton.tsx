import { FC, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import buttonBg from '../../../images/components/button-bg.png';
import arrowIcon from '../../../images/icons/pixel-arrow.svg';
import cursorIcon from '../../../images/icons/cursor.svg';

export interface ICustomButton {
    buttonText: string;
    handleButtonClick?: () => void;
    type: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    showArrow?: boolean;
    showCursor?: boolean;
}

export const CustomButton: FC<ICustomButton> = ({
    buttonText,
    handleButtonClick,
    type,
    disabled,
    className,
    showArrow = false,
    showCursor = false,
}) => {
    const router = useRouter();

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
        if (evt.key === 'Enter' && router.pathname !== '/order') {
            evt.preventDefault(); // Prevent default behavior of triggering the button click
            evt.stopPropagation(); // Stop event propagation to prevent multiple handlers from firing

            handleButtonClick && handleButtonClick();
        }
    };

    useEffect(() => {
        const handleEnterClick = (evt: KeyboardEvent) => {
            if (evt.key === 'Enter' && router.pathname !== '/order') {
                handleButtonClick && handleButtonClick();
            }
        };

        document.addEventListener('keydown', handleEnterClick);

        return () => document.removeEventListener('keydown', handleEnterClick);
    }, [handleButtonClick, router]);

    return (
        <button
            className={`${styles.button} ${className ? className : ''}`}
            disabled={disabled}
            type={type}
            onClick={handleButtonClick}
            onKeyDown={handleKeyDown}
        >
            <Image
                src={buttonBg}
                alt=""
                className={styles.button_bg}
                fill
            />
            <span className={styles.button_text}>{buttonText}</span>
            {showArrow && (
                <Image
                    src={arrowIcon}
                    alt=""
                    width={36}
                    height={36}
                    className={styles.button_arrow}
                />
            )}
            {showCursor && (
                <Image
                    src={cursorIcon}
                    alt=""
                    width={39}
                    height={40}
                    className={styles.button_cursor}
                />
            )}
        </button>
    );
};
