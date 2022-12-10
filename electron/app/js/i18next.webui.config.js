const i18n = require('i18next');
const i18nextBackend = require('i18next-fs-backend');
const path = require('path');

/* global __dirname */
const localesDir = path.normalize(path.join(__dirname, '..', 'locales'));

const i18nextOptions = {
  backend:{
    // path where resources get loaded from
    loadPath: path.join(localesDir, '{{lng}}', '{{ns}}.json'),

    // path to post missing resources
    addPath: path.join(localesDir, '{{lng}}', '{{ns}}.missing.json'),

    // jsonIndent to use when storing json files
    jsonIndent: 2,
  },
  ns: ['electron', 'webui'],
  defaultNS: 'webui',
  interpolation: {
    escapeValue: false
  },
  nonExplicitSupportedLngs: true,
  saveMissing: true,
  languages: ['de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'pt-BR', 'zh-CN', 'zh-TW'],
  fallbackLng: 'en',
  react: {
    wait: false
  }
};

i18n.use(i18nextBackend);

// initialize
i18n.init(i18nextOptions);

module.exports = i18n;
