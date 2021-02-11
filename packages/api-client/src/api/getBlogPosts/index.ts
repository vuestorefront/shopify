/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getBlogPosts(context, params, customQuery?: CustomQuery) {
  // Use the built-in function
  const articlesQuery = context.client.graphQLClient.query((root) => {
    root.addConnection('articles', { args: { first: 20 } }, (article) => {
      article.add('title');
      article.add('handle');
      article.add('url');
      article.add('excerpt');
      article.add('publishedAt');
      article.addField('image', {}, (image) => {
        image.add('id');
        image.add('altText');
        image.add('originalSrc');
      });
      article.addField('authorV2', {}, (author) => {
        author.add('name');
        author.add('email');
      });
    });
  });
  // Call the send method with the custom query
  context.client.graphQLClient.send(articlesQuery).then(({ model, articles }) => {
    if (model) {
      return model.articles;
    }
  });
}
