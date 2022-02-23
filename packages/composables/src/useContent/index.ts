import {
  Context,
  useContentFactory,
  UseContentFactoryParams
} from '@vue-storefront/core';
import { ContentType, ContentPosition } from '../types';

const params: UseContentFactoryParams<ContentType, ContentPosition> = {
  search: async (context: Context, params) => {
    const { ...searchParams } = params;
    if (params.ContentType) {
      if (params.ContentType === 'updatePreferences') {
        return await context.$shopify.api.updateNewsLetterPreferences(searchParams);
      } else if (params.ContentType === 'page') {
        const response = await context.$shopify.api.getPage(params)
        return response?.data?.page;
      }
    }
    return await context.$shopify.api.getBlogPosts(searchParams);
  }
};

export default useContentFactory<ContentType, ContentPosition>(params);
