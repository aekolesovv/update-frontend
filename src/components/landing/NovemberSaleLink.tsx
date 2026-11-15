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
