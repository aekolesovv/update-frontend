import React from 'react';
import styles from './style.module.scss';

interface ICustomSelectProps {
    labelText: string;
    options: ISelectOption[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
    labelText,
    options,
    selectedValue,
    onChange,
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.input__hints}>
                {labelText ? <label className={`${styles.input__label}`}>{labelText}</label> : null}
            </div>
            <div className={styles.select__container}>
                {options.map(option => (
                    <div
                        key={option.value}
                        className={`${styles.select} ${
                            selectedValue === option.value ? styles.selected : styles.not_selected
                        }`}
                        onClick={() => onChange(option.value)}
                    >
                        <p className={styles.select__text}>{option.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSelect;
