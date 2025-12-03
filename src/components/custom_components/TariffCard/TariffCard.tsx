import Image from 'next/image';
import { FC, ReactNode } from 'react';
import styles from './style.module.scss';
import computerImage from '../../../images/components/computer.svg';
import cherryImage from '../../../images/logo/cherry.svg';

export interface TariffCardProps {
    title: string;
    tag?: string;
    features: string;
    price: string;
    button: ReactNode;
}

export const TariffCard: FC<TariffCardProps> = ({
    title,
    tag,
    features,
    price,
    button,
}) => {
    return (
        <div className={styles.card}>
            <Image
                src={computerImage}
                alt="Computer illustration"
                className={styles.computer_image}
                fill
            />

            <div className={styles.card_content}>
                <h3 className={styles.card_title}>{title}</h3>
                {tag ? (<span className={styles.card_tag}>{tag}</span>) : ''}
                <p className={styles.card_features}>
                    {features.split('\n').map((line, i, lines) => {
                        const isLastLine = i === lines.length - 1;
                        const hasCherry = line.includes('cherry on top');

                        if (hasCherry) {
                            const parts = line.split('cherry on top');
                            return (
                                <span key={i}>
                                    {parts[0]}
                                    cherry on top{' '}
                                    <Image
                                        src={cherryImage}
                                        alt=""
                                        width={20}
                                        height={20}
                                        style={{ display: 'inline-block', verticalAlign: 'middle' }}
                                    />
                                    {parts[1]}
                                    {!isLastLine && <br />}
                                </span>
                            );
                        }

                        return (
                            <span key={i}>
                                {line}
                                {!isLastLine && <br />}
                            </span>
                        );
                    })}
                </p>
                <div className={styles.card_price}>{price}</div>
                {button}
            </div>
        </div>
    );
};

