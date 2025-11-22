/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://updateyou.ru',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
};
