import { Module } from '@nuxt/types'

const CMSRuntimeModule: Module = async function () {
  const middlewareConfig = await import(this.options.rootDir + '/middleware.config.js')
  const userConfig = middlewareConfig.integrations.shopify.configuration

  this.nuxt.options.publicRuntimeConfig.cms = userConfig?.cms ?? { blogs: '/blogs', articles: '/articles' }
}

export default CMSRuntimeModule