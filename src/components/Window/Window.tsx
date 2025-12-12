import { FC, ReactNode } from 'react';
import styles from './style.module.scss';

interface WindowProps {
    children: ReactNode;
    width?: number | string;
    height?: number | string;
    mobileAutoScale?: boolean;
}

export const Window: FC<WindowProps> = ({ children, width, height, mobileAutoScale = false }) => {
    return (
        <div
            className={`${styles.window} ${mobileAutoScale ? styles.window_mobile : ''}`}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
            }}
        >
            <div className={styles.window_header}>
                <div className={styles.window_close}>×</div>
            </div>
            <div className={styles.window_content}>
                {children}
            </div>
            <div className={styles.window_right}></div>
            <div className={styles.window_bottom}></div>
        </div>
    );
};
