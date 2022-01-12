/* istanbul ignore file */
import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Cart, CartItem, Coupon, Product } from '../types';

const params: UseCartFactoryParams<Cart, CartItem, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    const APP = context.$shopify.config.app;

    // check if cart is already initiated
    const appKey = APP.$config.appKey;
    let existngCartId = APP.$cookies.get(appKey + '_cart_id');
    let curLocaleCode = APP.$cookies.get('CurLocaleLang');
    // eslint-disable-next-line eqeqeq
    if (curLocaleCode === undefined || curLocaleCode == '' ) {
      curLocaleCode = APP.$cookies.set('CurLocaleLang', (APP.i18n.localeProperties.alias).toUpperCase(), {maxAge: 60 * 60 * 24 * 24000, path: '/'});
    }
    // eslint-disable-next-line eqeqeq
    if (existngCartId === undefined || existngCartId == '' || (APP.i18n && APP.$cookies.get('CurLocaleLang') !== (APP.i18n.localeProperties.alias).toUpperCase()))
    {
      existngCartId = await context.$shopify.api.createCart({ customQuery: curLocaleCode, lineItems: APP.store.state.cartItems ? APP.store.state.cartItems : [] }).then((checkout) => {
        return checkout;
      });
    }
    const checkoutId = existngCartId;
    const plainResp = await context.$shopify.api.checkOut(checkoutId).then((checkout) => {
      // Do something with the checkout
      return checkout;
    });
    return JSON.parse(JSON.stringify(plainResp));
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const appKey = context.$shopify.config.app.$config.appKey;
    return await context.$shopify.api.addToCart({ currentCart, product, quantity, customQuery }).then((checkout) => {
      // store cart id
      context.$shopify.config.app.$cookies.set(appKey + '_cart_id', currentCart.id, {maxAge: 60 * 60 * 24 * 365, path: '/'});
      return JSON.parse(JSON.stringify(checkout));
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    // Remove an item from the checkout
    return await context.$shopify.api.removeFromCart({currentCart, product}).then((checkout) => {
      // return updated cart data
      return JSON.parse(JSON.stringify(checkout));
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    // Update an item Quantity
    return await context.$shopify.api.updateCart({currentCart, product, quantity}).then((checkout) => {
      // return updated cart data
      return JSON.parse(JSON.stringify(checkout));
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: useCart.applyCoupon');
    return {
      updatedCart: {},
      updatedCoupon: {}
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: useCart.removeCoupon');
    return {
      updatedCart: {}
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => {
    const getBasketItemByProduct = ({ currentCart, product }) => {
      if (product) {
        let variantId;
        if (product && product.variantBySelectedOptions && product.variantBySelectedOptions !== null) {
          variantId = product.variantBySelectedOptions.id;
        }
        if (product.variants) {
          variantId = product.variants[0].id;
        }
        if (product.barcodes) {
          // handle & convert plain product Id from BCapp to base64
          const variationIDPlain = 'gid://shopify/ProductVariant/' + variantId;
          const buff = Buffer.from(variationIDPlain);
          variantId = buff.toString('base64');
        }
        return currentCart.lineItems.find((item) => item.variant.id === variantId);
      }
      return false;
    };

    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  }
};

export default useCartFactory<Cart, CartItem, Product>(params);
