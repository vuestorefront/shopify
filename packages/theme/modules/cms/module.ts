import { Module } from '@nuxt/types'

const CMSModule: Module = async function () {
  const middlewareConfig = await import(this.options.rootDir + '/middleware.config.js')

  const userConfig = middlewareConfig.integrations.shopify.configuration

  this.options.publicRuntimeConfig = Object.assign(this.options.publicRuntimeConfig, {
    routes: userConfig?.routes ?? { blogs: '/blogs', articles: '/articles' }
  })

  this.options.router.extendRoutes = (routes, resolve) => {
    const prefixBlogs = userConfig?.routes?.blogs
    const prefixArticles = userConfig?.routes?.articles

    routes.push({
      path: prefixBlogs,
      name: 'blogs',
      component: resolve(__dirname, './pages/blogs/index.vue')
    })

    routes.push({
      path: prefixBlogs + '/:handle',
      name: 'blogs-handle',
      component: resolve(__dirname, './pages/blogs/_handle.vue')
    })

    routes.push({
      path: prefixArticles + '/:handle',
      name: 'articles-handle',
      component: resolve(__dirname, './pages/articles/_handle.vue')
    })

    return routes
  }
}

export default CMSModule