require('isomorphic-fetch');
import webpack from 'webpack';

export default {
  server: {
    port: 3001,
    host: '0.0.0.0'
  },
  head: {
    title: 'Shopify | Vue Storefront Next',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'theme-color', content: '#5ece7b'},
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'preload',
        href:
            'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href:
            'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        media: 'print',
        onload: 'this.media=\'all\''
      }
    ]
  },
  loading: {color: '#fff'},
  buildModules: [
    // to core
    '@nuxtjs/pwa',
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    [
      '@vue-storefront/nuxt',
      {
        useRawSource: {
          dev: ['@vue-storefront/shopify', '@vue-storefront/core'],
          prod: ['@vue-storefront/shopify', '@vue-storefront/core']
        }
      }
    ],
    ['@vue-storefront/nuxt-theme'],
    [
      '@vue-storefront/shopify/nuxt',
      {
        i18n: {
          useNuxtI18nConfig: true
        }
      }
    ]
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt'
  ],
  loaders: [
    {
      test: /\.css$/,
      loaders: ['style?insertAt=top', 'css']
    }
  ],
  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      {name: 'US', label: 'United States'},
      {name: 'AT', label: 'Austria'},
      {name: 'DE', label: 'Germany'},
      {name: 'NL', label: 'Netherlands'}
    ],
    currencies: [
      {name: 'EUR', label: 'Euro'},
      {name: 'USD', label: 'Dollar'}
    ],
    locales: [
      {
        code: 'en',
        label: 'English',
        file: 'en.js',
        iso: 'en'
      },
      {
        code: 'de',
        label: 'German',
        file: 'de.js',
        iso: 'de'
      }
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol'
          }
        },
        de: {
          currency: {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol'
          }
        }
      }
    },
    detectBrowserLanguage: {
      cookieKey: 'vsf-locale'
    }
  },
  styleResources: {
    scss: [
      require.resolve('@storefront-ui/shared/styles/_helpers.scss', {
        paths: [process.cwd()]
      })
    ]
  },
  build: {
    transpile: [
      '/^@storefront-ui/',
      'vee-validate/dist/rules',
      'vue-instantsearch',
      'instantsearch.js/es'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  },
  router: {
    // TODO evaluate the potential for removing "require" as it is flagged via the eslint
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parseQuery(queryString) {
      return require('qs').parse(queryString);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stringifyQuery(object) {
      const queryString = require('qs').stringify(object);
      return queryString ? '?' + queryString : '';
    }
  }
};
