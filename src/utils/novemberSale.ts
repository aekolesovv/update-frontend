import { ClubPlan, PERSONAL_TIERS, PLAN_PAYMENTS, ProdamusOrder } from './prodamus';

export const NOVEMBER_SALE_START = Date.parse('2026-11-01T00:00:00+03:00');
export const NOVEMBER_SALE_END = Date.parse('2026-12-01T00:00:00+03:00');
export const NOVEMBER_SALE_LAST_DAY = '2026-11-30';

export const isNovemberSale = (now: number): boolean => now >= NOVEMBER_SALE_START && now < NOVEMBER_SALE_END;

const rubles = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 });
export const formatPrice = (amount: number): string => rubles.format(amount);

const discountedPrice = (amount: number, discount: number) => Math.round(amount * (100 - discount)) / 100;

const getOffer = (regular: ProdamusOrder, salePrice: number, saleActive: boolean) => {
    const onSale = saleActive && salePrice < regular.sum;
    const amount = onSale ? salePrice : regular.sum;

    return {
        amount,
        onSale,
        regular: regular.sum,
        discount: onSale ? Math.round((1 - amount / regular.sum) * 100) : 0,
        payment: onSale ? { ...regular, sum: amount, linkExpired: '01.12.2026 00:00' } : regular,
    };
};

export const getClubOffer = (plan: ClubPlan, saleActive: boolean) => {
    const regular = PLAN_PAYMENTS[plan];
    const salePrice = plan === 'plan-1' ? 6400 : discountedPrice(regular.sum, plan === 'plan-3' ? 20 : 30);
    return getOffer(regular, salePrice, saleActive);
};

export const getPersonalOffer = (tier: (typeof PERSONAL_TIERS)[number], saleActive: boolean) => {
    const discount = { 1: 0, 4: 20, 8: 30 }[tier.lessons];
    return getOffer(tier, discountedPrice(tier.sum, discount), saleActive);
};
