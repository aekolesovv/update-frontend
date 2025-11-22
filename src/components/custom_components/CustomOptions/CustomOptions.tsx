import { FC, useState } from 'react';
import styles from './style.module.scss';

interface CustomSelectProps {
    label: string;
    options: { value: string; label: string }[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const CustomSelect: FC<CustomSelectProps> = ({ label, options, selectedValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const defaultValue = options[0]?.value || '';

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (value: string) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div className={styles.selectWrapper}>
            <label className={styles.selectLabel}>{label}</label>
            <div className={styles.selectBox} onClick={toggleDropdown}>
                {options.find(opt => opt.value === selectedValue)?.label || options[0]?.label}
                <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}></span>
            </div>
            {isOpen && (
                <ul className={styles.optionsList}>
                    {options.map(option => (
                        <li
                            key={option.value}
                            className={`${styles.option} ${selectedValue === option.value ? styles.selected : ''}`}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;

// import { FC, useState } from "react";
// import styles from "./style.module.scss";

// interface CustomSelectProps {
// 	label: string;
// 	options: { value: string; label: string }[];
// 	selectedValue: string;
// 	onChange: (value: string) => void;
// }

// const CustomSelect: FC<CustomSelectProps> = ({ label, options, selectedValue, onChange }) => {
// 	const [isOpen, setIsOpen] = useState(false);

// 	const toggleDropdown = () => setIsOpen(!isOpen);
// 	const handleOptionClick = (value: string) => {
// 		onChange(value);
// 		setIsOpen(false);
// 	};

// 	return (
// 		<div className={styles.selectWrapper}>
// 			<label className={styles.selectLabel}>{label}</label>
// 			<div className={styles.selectBox} onClick={toggleDropdown}>
// 				{selectedValue ? options.find(opt => opt.value === selectedValue)?.label : "Выберите опцию"}
// 				<span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}></span>
// 			</div>
// 			{isOpen && (
// 				<ul className={styles.optionsList}>
// 					{options.map((option) => (
// 						<li
// 							key={option.value}
// 							className={`${styles.option} ${selectedValue === option.value ? styles.selected : ""}`}
// 							onClick={() => handleOptionClick(option.value)}
// 						>
// 							{option.label}
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// };

// export default CustomSelect;
