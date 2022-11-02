/* istanbul ignore file */
import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Cart, CartItem, Product } from '../types';
const params: UseCartFactoryParams<Cart, CartItem, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    // check if cart is already initiated
    const app = context.$shopify.config.app;
    const appKey = app.$config.appKey;
    let existingLocale = app.$cookies.get('cur-vsf-locale');
    let isLocaleSwitched = false;
    if (existingLocale === undefined || existingLocale === '' || existingLocale !== app.i18n.locale) {
      app.$cookies.set('cur-vsf-locale', app.i18n.locale);
      existingLocale = app.$cookies.get('cur-vsf-locale');
      isLocaleSwitched = true;
    } 
    let existngCartId = app.$cookies.get(appKey + '_cart_id');
    if ((existngCartId === undefined || existngCartId === '' || isLocaleSwitched)) {
      // Initiate new cart
      existngCartId = await context.$shopify.api.createCart().then((checkout) => {
        app.$cookies.set(appKey + '_cart_id', checkout.id, {maxAge: 60 * 60 * 24 * 365, path: '/'});
        return checkout.id;
      });
    }
    const checkoutId = existngCartId;
    // Keep existing cart
    const plainResp = await context.$shopify.api.checkOut(checkoutId).then(async(checkout) => {
       // Do something with the checkout
      if(checkout.orderStatusUrl !== null){
        const newCheckout = await context.$shopify.api.createCart().then((checkout) => {
            return checkout;
        });
        app.$cookies.set(appKey + '_cart_id', newCheckout.id, {maxAge: 60 * 60 * 24 * 365, path: '/'});
        return newCheckout;
      }else {
        return checkout;
      }
    });
    return JSON.parse(JSON.stringify(plainResp));
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const app = context.$shopify.config.app;
    const appKey = app.$config.appKey;
    return await context.$shopify.api.addToCart({ currentCart, product, quantity, customQuery }).then((checkout) => {
      // store cart id
      if (!app.$cookies.get(appKey + '_cart_id', currentCart.id)) {
        app.$cookies.set(appKey + '_cart_id', currentCart.id, { maxAge: 60 * 60 * 24 * 365, path: '/' });  
      }
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
    return await context.$shopify.api.applyCoupon({ currentCart, couponCode, customQuery }).then((checkout) => {
      // return updated checkout data
      return {
        updatedCart: JSON.parse(JSON.stringify(checkout.checkout))
      };
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    return await context.$shopify.api.removeCoupon({ currentCart, couponCode, customQuery }).then((checkout) => {
      // return updated checkout data
      return {
        updatedCart: JSON.parse(JSON.stringify(checkout.checkout))
      };
    });
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
          return currentCart?.lineItems?.find?.((item) => item.variant.id === variantId);

      }
      return false;
    };

    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  }
};

export default useCartFactory<Cart, CartItem, Product>(params);
