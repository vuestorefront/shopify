import { Article } from '@vue-storefront/shopify-apollo/src/shopify';

const getArticleImage = (article: Article) => {
  return article?.image?.url
}

export const articleGetters = {
  getImage: getArticleImage
};
