/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getProduct(context, params, customQuery?: CustomQuery) {
  if (params.id) {
    return await context.client.product.fetch(params.id).then((products) => {
      return products;
    });
  } else if (params.sort) {
    return await context.client.product.fetchQuery({first: 20, sortKey: 'TITLE', reverse: false}).then((products) => {
      return products;
    });
  } else {
    // Use the built-in function
    return await context.client.product.fetchAll().then((products) => {
      return products;
    });
  }
}

