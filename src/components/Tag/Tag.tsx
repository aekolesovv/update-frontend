import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';
import chatImage from '../../images/components/chat-filled.png';

interface TagProps {
    text: string;
    width: number;
    height: number;
    mWidth: number;
    mHeight: number;
    tailLeft?: boolean;
}

export const Tag: FC<TagProps> = ({ text, width, height, mWidth, mHeight, tailLeft = false }) => {
    const lines = text.split(/\n/);

    return (
        <div
            className={styles.tag}
            style={{
                '--mobile-width': `${mWidth}px`,
                '--mobile-height': `${mHeight}px`,
            } as React.CSSProperties}
        >
            <Image
                src={chatImage}
                alt={text}
                width={width}
                height={height}
                className={tailLeft ? styles.tag_image_flipped : ''}
            />
            <span className={styles.tag_text}>
                {lines.map((line, i) => (
                    <span key={i}>{line}</span>
                ))}
            </span>
        </div>
    );
};

