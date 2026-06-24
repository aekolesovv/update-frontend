/* Prodamus payform integration.
 * The widget script (widget.prodamus.ru/src/init.js) is loaded in _app and
 * exposes window.payformInit(domain, params), which opens a full-screen
 * payment iframe over the page and removes itself on close. */

declare global {
    interface Window {
        payformInit?: (domain: string, params: Record<string, unknown>) => void;
    }
}

export const PRODAMUS_DOMAIN = process.env.NEXT_PUBLIC_PRODAMUS_PAYFORM_DOMAIN || '';

export const prodamusReady = (): boolean =>
    typeof window !== 'undefined' && typeof window.payformInit === 'function' && !!PRODAMUS_DOMAIN;

export interface ProdamusOrder {
    /** Amount in rubles. */
    sum: number;
    /** Stable order id prefix; a timestamp is appended for uniqueness. */
    orderId: string;
    /** Line-item name shown on the payform. */
    name: string;
    customerPhone?: string;
    customerEmail?: string;
}

/** Opens the Prodamus payment iframe. Returns false if the widget isn't ready. */
export const openProdamus = ({ sum, orderId, name, customerPhone, customerEmail }: ProdamusOrder): boolean => {
    if (!prodamusReady()) return false;
    const params: Record<string, unknown> = {
        order_id: `${orderId}-${Date.now()}`,
        currency: 'rub',
        products: [{ name, price: sum, quantity: 1 }],
    };
    if (customerPhone) params.customer_phone = customerPhone;
    if (customerEmail) params.customer_email = customerEmail;
    window.payformInit!(PRODAMUS_DOMAIN, params);
    return true;
};

/** Subscription plan amounts (real prices, mirror of the pricing cards). */
export const PLAN_PAYMENTS: Record<'plan-1' | 'plan-3' | 'plan-6', { sum: number; orderId: string; name: string }> = {
    'plan-1': { sum: 8000, orderId: 'club-1m', name: 'Update You — подписка на 1 месяц' },
    'plan-3': { sum: 21600, orderId: 'club-3m', name: 'Update You — подписка на 3 месяца' },
    'plan-6': { sum: 40800, orderId: 'club-6m', name: 'Update You — подписка на 6 месяцев' },
};

/** Personal-lessons packages (real prices, mirror of the Personal section). */
export const PERSONAL_TIERS: Array<{ label: string; note: string; sum: number; orderId: string; name: string }> = [
    { label: '1 занятие', note: 'разовое', sum: 4000, orderId: 'personal-1', name: 'Персональные занятия — 1 занятие' },
    { label: 'Абонемент · 4 занятия', note: '−5%', sum: 15200, orderId: 'personal-4', name: 'Персональные занятия — 4 занятия' },
    { label: 'Абонемент · 8 занятий', note: '−5%', sum: 30400, orderId: 'personal-8', name: 'Персональные занятия — 8 занятий' },
];
