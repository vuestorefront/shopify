/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import Cookie from 'js-cookie';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function createCart(context, _params, _customQuery?: CustomQuery) {
  // return checkout id if already exists
  if (Cookie.get('CurCart')) {
    return Cookie.get('CurCart');
  }
  // initiate the cart
  return await context.client.checkout.create().then((checkout) => {
    // return checkOut ID
    Cookie.set('CurCart', checkout.id);
    return checkout.id;
  });
}
