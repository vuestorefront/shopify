/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function createCart(context, _params, _customQuery?: CustomQuery) {
  // initiate the cart
  return await context.client.checkout.create().then((checkout) => {
    // return checkOut ID
    return checkout.id;
  });
}
