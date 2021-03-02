require('isomorphic-fetch');
import webpack from 'webpack';

export default {
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: 'Vue Storefront',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
  loading: { color: '#fff' },
  plugins: [],
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    [
      '@vue-storefront/nuxt',
      {
        // @core-development-only-start
        coreDevelopment: true,
        // @core-development-only-end
        useRawSource: {
          dev: ['@vue-storefront/shopify', '@vue-storefront/core'],
          prod: ['@vue-storefront/shopify', '@vue-storefront/core']
        }
      }
    ],
    // @core-development-only-start
    [
      '@vue-storefront/nuxt-theme',
      {
        generate: {
          replace: {
            apiClient: '@vue-storefront/shopify-api',
            composables: '@vue-storefront/shopify'
          }
        }
      }
    ],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    [
      '@vue-storefront/shopify/nuxt',
      {
        api: {
          domain: 'YOUR SHOPIFY STORE DOMAIN',
          storefrontAccessToken: 'YOUR STORE ACCESS TOKEN'
        },
        i18n: {
          useNuxtI18nConfig: true
        }
      }
    ]
  ],
  modules: ['nuxt-i18n', 'cookie-universal-nuxt', 'vue-scrollto/nuxt'],
  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      { name: 'US', label: 'United States' },
      { name: 'AT', label: 'Austria' },
      { name: 'DE', label: 'Germany' },
      { name: 'NL', label: 'Netherlands' }
    ],
    currencies: [
      { name: 'EUR', label: 'Euro' },
      { name: 'USD', label: 'Dollar' }
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
    transpile: ['vee-validate/dist/rules'],
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  },
  pwa: {
    manifest: {
      name: 'VSF Next: Shopify APP',
      lang: 'en',
      shortName: 'VSF Next',
      startUrl: '/',
      display: 'standalone',
      backgroundColor: '#fff',
      themeColor: '#5ece7b',
      description: 'This is the Shopify PWA app for VSF Next',
      icons: [
        {
          src: '/icons/android-icon-48x48.png',
          sizes: '48X48',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-72x72.png',
          sizes: '72X72',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-96x96.png',
          sizes: '96X96',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-144x144.png',
          sizes: '144X144',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-168x168.png',
          sizes: '168X168',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-192x192.png',
          sizes: '192X192',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-512x512.png',
          sizes: '512X512',
          type: 'image/png'
        }
      ]
    },
    meta: {
      name: 'VSF Next: Shopify APP',
      author: 'Aureate labs',
      description:
        'This is the Shopify PWA app for VSF Next - Developed by Aureate labs',
      themeColor: '#5ece7b',
      ogHost: 'shopify-pwa.aureatelabs.com'
    },
    icon: {
      iconSrc: 'src/static/android-icon-512x512.png'
    }
  }
};
