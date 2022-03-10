import { Article } from '@vue-storefront/shopify-apollo/src/shopify';
import { formatDate } from './_utils';

export const articleGetters = {
  getImage: (article: Article) => article?.image?.url,
  getPublishedAt: (article: Article) =>
    article?.publishedAt && formatDate(article?.publishedAt)
};
