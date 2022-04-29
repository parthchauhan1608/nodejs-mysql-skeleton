const { I18n } = require('i18n');
const EN = require('../language/en.json');

const i18n = new I18n();
i18n.configure({
    locales: ['en'],
    staticCatalog: {
        en: EN,
    },
    defaultLocale: 'en',
    api: {
        __: 't',
    },
    register: global,
    header: 'accept-language',
});

module.exports = i18n;
