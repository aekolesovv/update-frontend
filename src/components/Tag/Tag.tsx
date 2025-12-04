import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';
import chatImage from '../../images/components/chat-filled.png';

interface TagProps {
    text: string;
    width: number;
    height: number;
}

export const Tag: FC<TagProps> = ({ text, width, height }) => {
    const lines = text.split(/\n/);

    return (
        <div className={styles.tag}>
            <Image
                src={chatImage}
                alt={text}
                width={width}
                height={height}
            />
            <span className={styles.tag_text}>
                {lines.map((line, i) => (
                    <span key={i}>{line}</span>
                ))}
            </span>
        </div>
    );
};

