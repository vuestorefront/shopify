import {
  Context as DeprecatedContext,
  useContentFactory,
  UseContentFactoryParams
} from '@vue-storefront/core';
import { QueryRootBlogArgs, QueryRootBlogsArgs, QueryRootNodeArgs, QueryRootPageArgs } from '@vue-storefront/shopify-apollo/src/shopify';
import { GetArticlesParams } from '@vue-storefront/shopify-apollo/src/types/GetArticlesParams';
import { Context } from '../types'
import { ContentType } from '../types/ContentType';
import { UseContentParams } from '../types/UseContentParams';

const params: UseContentFactoryParams<unknown, UseContentParams> = {
  search: async (context: Context, params) => {
    const deprecatedApi = (context as DeprecatedContext).$shopify.api

    switch (params.contentType) {
      case ContentType.UpdatePreference:
        return deprecatedApi.updateNewsLetterPreferences(params);
      case ContentType.Page: {
        const response = await context.$shopify.api.getPage(params as QueryRootPageArgs)
        return response?.data?.page;
      }
      case ContentType.Blog: {
        if (Object.prototype.hasOwnProperty.call(params, 'id') || Object.prototype.hasOwnProperty.call(params, 'handle')) {
          const response = await context.$shopify.api.getBlog(params as QueryRootBlogArgs)
          if (response.error) throw response.error

          return response?.data?.blog
        } else {
          const response = await context.$shopify.api.getBlogs(params as QueryRootBlogsArgs)
          if (response.error) throw response.error

          return response?.data?.blogs
        }
      }
      case ContentType.Article: {
        if (Object.prototype.hasOwnProperty.call(params, 'id') || Object.prototype.hasOwnProperty.call(params, 'handle')) {
          const response = await context.$shopify.api.getArticle(params as QueryRootNodeArgs)

          return response?.data?.article
        } else {
          const response = await context.$shopify.api.getArticles(params as GetArticlesParams)

          if (response.error) throw response.error


          return {
            data: response?.data?.articles,
            pageInfo: response?.pageInfo
          }
        }
      }
      default: {
        return deprecatedApi.getBlogPosts(params);
      }
    }
  }
};

export default useContentFactory<unknown, UseContentParams>(params);
