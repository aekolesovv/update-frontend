import { FC } from 'react';
import { Burger } from '../Burger/Burger';
import styles from './style.module.scss';

interface IBurgerButtonProps {
    isPopupOpen: boolean;
    switchPopup: () => void;
}
export const BurgerButton: FC<IBurgerButtonProps> = ({ isPopupOpen, switchPopup }) => {
    return (
        <div className={styles.burgerButton}>
            <button className={styles.burgerButton__image} onClick={switchPopup} />
            <Burger isPopupOpen={isPopupOpen} switchPopup={switchPopup} />
        </div>
    );
};
