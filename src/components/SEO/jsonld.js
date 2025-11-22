export const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'BAYAR',
    url: 'https://bayar.ru',
    logo: 'https://bayar.ru/api/logo.png',
    image: ['https://bayar.ru/api/logo.png'], // TODO добавить фото завода
    description: 'Завод-изготовитель сэндвич-панелей по лучшим ценам в РФ',
    priceRange: '₽₽₽',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Промышленная площадка АЛАБУГА, ул. 20, 1',
        addressLocality: 'Елабуга',
        postalCode: '423800',
        addressCountry: 'RU',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: '55.842130',
        longitude: '52.098163',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+7-800-550-31-90',
        contactType: 'customer service',
        email: 'info@bayar.ru',
        availableLanguage: ['Russian', 'English'],
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
        },
    ],
    sameAs: ['https://vk.com/bayar', 'https://t.me/bayar'], // TODO уточнить соцести и время работы
    hasMap: {
        '@type': 'Map',
        url: 'https://yandex.ru/maps/11119/republic-of-tatarstan/house/ulitsa_20_1k1/YUsYdg5oSEMEQFtvfXR1c31gZA==/?ll=52.098387%2C55.842061&z=18.09',
    },
    brand: {
        '@type': 'Brand',
        name: 'BAYAR',
        logo: 'https://bayar.ru/api/logo.png',
    },
    potentialAction: {
        '@type': 'BuyAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://bayar.ru/catalog/wall-panels',
            actionPlatform: [
                'http://schema.org/DesktopWebPlatform',
                'http://schema.org/MobileWebPlatform',
            ],
        },
    },
};
