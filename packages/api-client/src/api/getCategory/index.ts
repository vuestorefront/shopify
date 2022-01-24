/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getCategory(context, params, customQuery?: CustomQuery) {
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
