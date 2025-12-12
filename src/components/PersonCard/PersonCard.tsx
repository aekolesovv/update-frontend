import Image from 'next/image';
import { FC, ReactNode } from 'react';
import styles from './style.module.scss';

interface PersonCardProps {
    name: string;
    imageSrc: any;
    imageAlt: string;
    imageWidth: number;
    imageHeight: number;
    mImageWidth: number;
    mImageHeight: number;
    description: string | ReactNode;
    role?: string;
    tags?: {
        level?: string;
        xp?: string;
        tesol?: string;
    };
    sections?: Array<{
        label: string;
        text: string | ReactNode;
    }>;
    className?: string;
}

export const PersonCard: FC<PersonCardProps> = ({
    name,
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
    mImageWidth,
    mImageHeight,
    description,
    role,
    tags,
    sections,
    className = '',
}) => {
    return (
        <div className={`${styles.card} ${className}`}>
            <div
                className={styles.image_wrapper}
                style={{
                    '--mobile-image-width': `${mImageWidth}px`,
                    '--mobile-image-height': `${mImageHeight}px`,
                } as React.CSSProperties}
            >
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={imageWidth}
                    height={imageHeight}
                    className={styles.image}
                />
            </div>
            <div className={styles.card_content}>
                <h3 className={styles.name}>{name}</h3>

                {role && <span className={styles.section_label}>{role}</span>}

                {tags && (
                    <div className={styles.tags_container}>
                        <div className={styles.tags_column}>
                            {tags.level && <span className={styles.tag}>{tags.level}</span>}
                            {tags.xp && <span className={styles.tag}>{tags.xp}</span>}
                        </div>
                        {tags.tesol && <span className={styles.tag_tesol}>{tags.tesol}</span>}
                    </div>
                )}

                <p className={styles.description}>{description}</p>

                {sections && sections.map((section, index) => (
                    <div key={index} className={styles.section}>
                        <span className={styles.section_label}>{section.label}</span>
                        <p className={styles.section_text}>{section.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
