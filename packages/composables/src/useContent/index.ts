import {
  Context,
  useContentFactory,
  UseContentFactoryParams
} from '@vue-storefront/core';
import { ContentType, ContentPosition } from '../types';

const params: UseContentFactoryParams<ContentType, ContentPosition> = {
  search: async (context: Context, params) => {
    const { ...searchParams } = params;
    if (params.ContentType === 'updatePreferences') {
      return await context.$shopify.api.updateNewsLetterPreferences(searchParams);
    }
  }
};

export default useContentFactory<ContentType, ContentPosition>(params);
