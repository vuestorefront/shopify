export default function getBlogPosts(context) {
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
  context.client.graphQLClient.send(articlesQuery).then(({ model }) => {
    if (model) {
      return model.articles;
    }
  });
}
