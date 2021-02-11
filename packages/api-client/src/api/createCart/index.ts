/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import Cookies from 'js-cookie';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function createCart(context, params, customQuery?: CustomQuery) {
  return await context.client.checkout.create().then((checkout) => {
    // Checkout ID
    let checkoutID = Cookies.get('cart_id');
    if (!checkoutID) {
      checkoutID = Cookies.set('cart_id', checkout.id);
    }
    return checkoutID;
  });
}
