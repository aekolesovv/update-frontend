export const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Update',
    url: 'https://updateyou.ru',
    logo: 'https://updateyou.ru/icons/android-chrome-512x512.png',
    image: ['https://updateyou.ru/icons/android-chrome-512x512.png'],
    description: 'Тематические microlearning курсы английского, еженедельный дайджест трендов',
    educationalCredentialAwarded: 'Certificate',
    offers: {
        '@type': 'Offer',
        priceCurrency: 'RUB',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['Russian', 'English'],
    },
    sameAs: [], // TODO добавить ссылки на социальные сети
};
