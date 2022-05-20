const GTM_TAG = 'GTM-WMDC3CP';

module.exports = {
  title: 'Vue Storefront 2 for shopify',
  base: '/',
  description: 'Documentation for the shopify connector for Vue Storefront 2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],

    // Google Tag Manager
    ['script', {}, [`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_TAG}');
    `]],
  ],
  configureWebpack: (config) => {
    config.module.rules = config.module.rules.map(rule => ({
      ...rule,
      use: rule.use && rule.use.map(useRule => ({
        ...useRule,
        options: useRule.loader === 'url-loader' ?
          /**
            Hack for loading images properly.
            ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
           */
          {  ...useRule.options, esModule: false } :
          useRule.options
      }))
    }))
  },
  themeConfig: {
    GTM_TAG,
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/guide/getting-started', 'Getting Started'],
          ['/guide/configuration', 'Configuration'],
          ['/guide/authorization-strategy', 'Authorization'],
          ['/guide/feature-list', 'Feature list'],
          ['/guide/maintainers', 'Maintainers and support']
        ]
      },
      {
        title: 'Composables',
        collapsable: false,
        children: [
          ['/guide/use-product', 'useProduct'],
          ['/guide/use-user', 'useUser'],
          ['/guide/use-user-order', 'useUserOrder'],
          ['/guide/use-cart', 'useCart'],
          ['/guide/use-category', 'useCategory'],
          ['/guide/use-content', 'useContent'],
          ['/guide/use-search', 'useSearch']
        ]
      },
      {
        title: 'API Client',
        collapsable: false,
        children: [
          ['/guide/api-client-reference', 'Methods Reference']
        ]
      },
      {
        title: 'Theme',
        collapsable: false,
        children: [
          ['/guide/auth-middleware', 'Auth Middleware']
        ],
      },
      {
        title: 'Other',
        collapsable: false,
        children: [
          ['/guide/checkout', 'Checkout']
        ],
      }
    ]
  }
}
