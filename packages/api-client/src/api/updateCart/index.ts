/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function updateCart(context, params, _customQuery?: CustomQuery) {
  const { currentCart, product, quantity } = params;
  // Existing Checkout ID
  const checkoutID = currentCart.id;
  const itemID = product.id;

  // Add an item to the checkout
  return await context.client.checkout.updateLineItems(checkoutID, {id: product.id, quantity: quantity}).then((checkout) => checkout);
}
