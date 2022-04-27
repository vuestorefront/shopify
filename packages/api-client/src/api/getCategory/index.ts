export default function getCategory(context, params) {
  // Use the built-in function
  if (params.slug !== '') {
    return context.client.collection.fetchByHandle(params.slug).then((collection) => {
      // Collection with all default fields
      return collection;
    });
  } else {
    return context.client.collection.fetchAll().then((collection) => {
      // Collection with all default fields
      return collection;
    });
  }
}
