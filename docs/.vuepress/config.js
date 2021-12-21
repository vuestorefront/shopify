module.exports = {
  title: 'Vue Storefront 2 for shopify',
  base: '/',
  description: 'Documentation for the shopify connector for Vue Storefront 2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
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
          ['/composables/shopify', 'Definitions'],
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
          ['/api-client/shopify-api', 'Definitions']
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
