import webpack from 'webpack';

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport',
        content: 'width=device-width, initial-scale=1' },
      { hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico' }
    ],
    script: []
  },
  loading: { color: '#fff' },
  router: {
    middleware: ['checkout'],
    scrollBehavior (_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  },
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
      logger: {
        verbosity: 'error'
      },
      useRawSource: {
        dev: [
          '@vue-storefront/shopify',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/shopify',
          '@vue-storefront/core'
        ]
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      generate: {
        replace: {
          apiClient: '@vue-storefront/shopify-api',
          composables: '@vue-storefront/shopify'
        }
      }
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/shopify/nuxt', {
      api: {
        uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
        authHost: 'https://auth.sphere.io',
        projectKey: 'vsf-ct-dev',
        clientId: 'RT4iJGDbDzZe4b2E6RyeNe9s',
        clientSecret: '5eBt3yfZJWw1j7V6kXjfKXpuFP-YQXpg',
        scopes: [
          'manage_products:vsf-ct-dev',
          'create_anonymous_token:vsf-ct-dev',
          'manage_my_profile:vsf-ct-dev',
          'manage_customer_groups:vsf-ct-dev',
          'view_categories:vsf-ct-dev',
          'introspect_oauth_tokens:vsf-ct-dev',
          'manage_my_payments:vsf-ct-dev',
          'manage_my_orders:vsf-ct-dev',
          'manage_my_shopping_lists:vsf-ct-dev',
          'view_published_products:vsf-ct-dev'
        ]
      },
      shopify: {
        domain: "vsf-next-pwa.myshopify.com",
        storefrontAccessToken: "03f21475b97c18fa05c0ab452c368af4",
      },
      i18n: {
        useNuxtI18nConfig: true
      }
    }]
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt'
  ],
  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      { name: 'US',
        label: 'United States' },
      { name: 'AT',
        label: 'Austria' },
      { name: 'DE',
        label: 'Germany' },
      { name: 'NL',
        label: 'Netherlands' }
    ],
    currencies: [
      { name: 'EUR',
        label: 'Euro' },
      { name: 'USD',
        label: 'Dollar' }
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
      fallbackLocale: 'en'
    },
    detectBrowserLanguage: {
      cookieKey: 'vsf-locale'
    }
  },
  build: {
    transpile: [
      'vee-validate/dist/rules'
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
  }
};
