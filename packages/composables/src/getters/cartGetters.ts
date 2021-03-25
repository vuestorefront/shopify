/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/shopify-api/src/types';
import { formatSelectedAttributeList } from './_utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItems = (cart: Cart): LineItem[] => {
  return cart.lineItems;

  /*
  return [{
    id: '1',
    description: 'Some description',
    categoriesRef: [
      '1',
      '2'
    ],
    name: 'Black jacket',
    sku: 'black-jacket',
    images: [
      'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
    ],
    price: {
      original: 12.34,
      current: 10.00
    },
    qty: 1
  }];
*/
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemName = (product: any): string => product?.title || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemImage = (product: any): string => product?.variant.image.src || 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemPrice = (product: any): AgnosticPrice => {
  return {
    regular: product?.variant.compareAtPrice || 12,
    special: product?.variant.price || 10
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemQty = (product: LineItem): number => product?.quantity;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemAttributes = (product: LineItem, filterByAttributeName?: Array<string>) => {
  const formatAttedattributeList = formatSelectedAttributeList(product?.variant.selectedOptions);
  if (formatAttedattributeList.length) {
    const attribArr = [];
    formatAttedattributeList.forEach((attr) => {
      attribArr[attr.name] = attr.value;
    });
    return { ...attribArr };
  }
  return {};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemSku = (product: any): string => product?.variant.sku || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (cart: Cart): AgnosticTotals => {
  return {
    total: parseFloat(cart.totalPrice),
    subtotal: parseFloat(cart.subtotalPrice)
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number => 0;

export const getcheckoutURL = (cart: Cart): string => {
  console.log('cart::', cart);
  return cart.webUrl || '';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (cart: Cart): number => {
  if (cart) {
    return cart.lineItems.length;
  }
  return 0;
};

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCoupons,
  getDiscounts,
  getcheckoutURL
};

export default cartGetters;
