/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function removeFromCart(context, params, _customQuery?: CustomQuery) {
  const { currentCart, product } = params;
  // Existing Checkout ID
  const checkoutID = currentCart.id;

  // products to be remove
  const lineItemIdsToRemove = [
    product.id
  ];
  // Add an item to the checkout
  return await context.client.checkout.removeLineItems(checkoutID, lineItemIdsToRemove).then((checkout) => checkout);
}
