/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Cart, CartItem, Coupon, Product } from '../types';

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: loadCart');
    const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC8xNmY3NmYwMzE3ZmU1NGMyODRmNjhhYTMzOTRlNGUzZj9rZXk9YTQxYmQxODM4YmUyOThjMDY5OWUyZDk2ZDFlNTlhOTc=';
    const plainResp = await context.$shopify.api.checkOut(checkoutId).then((checkout) => {
      // Do something with the checkout
      return checkout;
    });
    return JSON.parse(JSON.stringify(plainResp));
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    console.log('Mocked: addItem');
    return await context.$shopify.api.addToCart({ currentCart, product, quantity, customQuery }).then((checkout) => {
      // Do something with the checkout
      return JSON.parse(JSON.stringify(checkout));
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    console.log('Mocked: removeFromCart');
    // Remove an item from the checkout
    const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC8xNmY3NmYwMzE3ZmU1NGMyODRmNjhhYTMzOTRlNGUzZj9rZXk9YTQxYmQxODM4YmUyOThjMDY5OWUyZDk2ZDFlNTlhOTc=';
    return await context.$shopify.client.checkout.removeLineItems(checkoutId, [product.id]).then((checkout) => {
      // Do something with the updated checkout
      return JSON.parse(JSON.stringify(checkout));
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    console.log('Mocked: updateQuantity');
    // Update an item Quantity
    const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC8xNmY3NmYwMzE3ZmU1NGMyODRmNjhhYTMzOTRlNGUzZj9rZXk9YTQxYmQxODM4YmUyOThjMDY5OWUyZDk2ZDFlNTlhOTc=';
    return await context.$shopify.client.checkout.updateLineItems(checkoutId, {id: product.id, quantity: quantity}).then((checkout) => {
      // Do something with the updated checkout
      return JSON.parse(JSON.stringify(checkout));
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: clearCart');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: applyCoupon');
    return {updatedCart: {}, updatedCoupon: {}};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, coupon, customQuery }) => {
    console.log('Mocked: removeCoupon');
    return {updatedCart: {}};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: (context: Context, { currentCart, product }) => {
    console.log('Mocked: isOnCart');
    return false;
  }
};

export default useCartFactory<Cart, CartItem, Product, Coupon>(params);
