/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function addToCart(context, params, customQuery?: CustomQuery) {
  const { currentCart, product, quantity } = params;
  return await context.client.checkout.create().then((checkout) => {
    // Checkout ID
    const checkoutID = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC8xNmY3NmYwMzE3ZmU1NGMyODRmNjhhYTMzOTRlNGUzZj9rZXk9YTQxYmQxODM4YmUyOThjMDY5OWUyZDk2ZDFlNTlhOTc=';
    const lineItemsToAdd = [{
      variantId: product.variantId,
      quantity: quantity
    }
    ];

    // Add an item to the checkout
    return context.client.checkout.addLineItems(checkoutID, lineItemsToAdd).then((checkout) => checkout);
  });
}
