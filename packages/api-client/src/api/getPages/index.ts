export function getPages(context, params) {
  // Use the built-in function
  if (params.slug) {
    const pageByHandleQuery = context.client.graphQLClient.query((root) => {
      root.add('pageByHandle', { args: { handle: params.slug } }, (pageByHandle) => {
        pageByHandle.add('id');
        pageByHandle.add('title');
        pageByHandle.add('handle');
        pageByHandle.add('url');
        pageByHandle.add('bodySummary');
        pageByHandle.add('body');
        pageByHandle.add('createdAt');
      });
    });
    // Call the send method with the custom query
    return context.client.graphQLClient.send(pageByHandleQuery).then(({ model }) => {
      return model.pageByHandle;
    });
  } else {
    const pagesQuery = context.client.graphQLClient.query((root) => {
      root.addConnection('pages', { args: { first: params.limit ? params.limit : 20 } }, (article) => {
        article.add('id');
        article.add('title');
        article.add('handle');
        article.add('url');
        article.add('bodySummary');
        article.add('body');
        article.add('createdAt');
      });
    });
    // Call the send method with the custom query
    return context.client.graphQLClient.send(pagesQuery).then(({ model }) => {
      if (model) {
        return model;
      }
    });
  }
}
