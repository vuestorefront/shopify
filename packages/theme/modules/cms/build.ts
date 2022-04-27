import { Module } from '@nuxt/types'

const CMSBuildModule: Module = async function () {
 

  // this.nuxt.hook('generate:before', async () => {
    const middlewareConfig = await import(this.options.rootDir + '/middleware.config.js')
    const userConfig = middlewareConfig.integrations.shopify.configuration
  
    this.nuxt.options.publicRuntimeConfig.cms = userConfig?.cms ?? { blogs: '/blogs', articles: '/articles' }

    this.nuxt.options.router.extendRoutes = (routes, resolve) => {
      const prefixBlogs = userConfig?.cms?.blogs
      const prefixArticles = userConfig?.cms?.articles
  
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
  // });


}

export default CMSBuildModule