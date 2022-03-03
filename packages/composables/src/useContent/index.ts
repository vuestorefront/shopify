import {
  Context as DeprecatedContext,
  useContentFactory,
  UseContentFactoryParams
} from '@vue-storefront/core';
import { QueryRootBlogArgs, QueryRootBlogsArgs, QueryRootPageArgs } from '@vue-storefront/shopify-apollo/src/shopify';
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
          return response?.data?.blog
        } else {
          const response = await context.$shopify.api.getBlogs(params as QueryRootBlogsArgs)
          return response?.data?.blogs
        }
      }
      default:
        return deprecatedApi.getBlogPosts(params);
    }    
  }
};

export default useContentFactory<unknown, UseContentParams>(params);
