import { formatPrice, getClubOffer, NOVEMBER_SALE_LAST_DAY } from '@/utils/novemberSale';

export const NovemberSaleBanner = () => {
    const offer = getClubOffer('plan-1', true);

    return (
        <div className="wrap november-sale-wrap">
            <section className="november-sale" aria-labelledby="november-sale-title">
                <div className="november-sale-top">
                    <span className="november-sale-brand">UPDATE YOU</span>
                    <span className="november-sale-date">
                        Black Friday
                        <time dateTime={NOVEMBER_SALE_LAST_DAY}>До 30 ноября включительно</time>
                    </span>
                </div>
                <div className="november-sale-body">
                    <div>
                        <p className="november-sale-label">Школа английского</p>
                        <h2 className="november-sale-title" id="november-sale-title">
                            Не откладывай<br /><em>себя на январь.</em>
                        </h2>
                    </div>
                    <div className="november-sale-offer">
                        <p className="november-sale-discount">−{offer.discount}% на первый месяц</p>
                        <strong className="november-sale-amount">{formatPrice(offer.amount)}&nbsp;₽</strong>
                        <p className="november-sale-previous">вместо <s>{formatPrice(offer.regular)}&nbsp;₽</s></p>
                    </div>
                </div>
                <a className="november-sale-cta" href="#price">
                    Начать в ноябре <span aria-hidden="true">→</span>
                </a>
            </section>
        </div>
    );
};
