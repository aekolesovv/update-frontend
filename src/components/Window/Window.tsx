import { FC, ReactNode } from 'react';
import styles from './style.module.scss';

interface WindowProps {
    children: ReactNode;
    width?: number | string;
    height?: number | string;
    mWidth: number | string;
    mHeight: number | string;
    hideHeader?: boolean;
    showCherry?: boolean;
}

export const Window: FC<WindowProps> = ({
    children,
    width,
    height,
    mWidth,
    mHeight,
    hideHeader = false,
    showCherry = false
}) => {
    const mobileWidth = typeof mWidth === 'number' ? `${mWidth}px` : mWidth;
    const mobileHeight = typeof mHeight === 'number' ? `${mHeight}px` : mHeight;

    return (
        <div
            className={`${styles.window} ${hideHeader ? styles.window_no_header : ''} ${showCherry ? styles.window_with_cherry : ''}`}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                '--mobile-width': mobileWidth,
                '--mobile-height': mobileHeight,
            } as React.CSSProperties}
        >
            {!hideHeader && (
                <div className={styles.window_header}>
                    <div className={styles.window_close}>×</div>
                </div>
            )}
            <div className={styles.window_content}>
                {children}
            </div>
            <div className={styles.window_right}></div>
            <div className={styles.window_bottom}></div>
        </div>
    );
};
