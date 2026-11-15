import { formatPrice, getClubOffer } from '@/utils/novemberSale';

export const NovemberSaleLink = () => {
    const offer = getClubOffer('plan-1', true);

    return (
        <div className="wrap november-sale-wrap">
            <a className="november-sale-link" href="#price">
                <span className="november-sale-link-copy">
                    <strong className="november-sale-link-label" lang="en">Black Friday</strong>
                    <span>{formatPrice(offer.amount)}&nbsp;₽ за первый месяц</span>
                </span>
                <span className="november-sale-link-action">К тарифам <span aria-hidden="true">→</span></span>
            </a>
        </div>
    );
};

export const NovemberSaleBadge = () => {
    const { discount: mediumDiscount } = getClubOffer('plan-3', true);
    const { discount: maxDiscount } = getClubOffer('plan-6', true);

    return (
        <a
            className="november-sale-badge"
            href="#price"
            aria-label={`Black Friday Sales: скидки ${mediumDiscount} и ${maxDiscount} процентов. К тарифам`}
        >
            <span className="november-sale-badge-label" lang="en">Black Friday</span>
            <span className="november-sale-badge-caption" lang="en">Sales</span>
            <strong className="november-sale-badge-discounts">
                −{mediumDiscount}% <span aria-hidden="true">·</span> −{maxDiscount}%
            </strong>
        </a>
    );
};
