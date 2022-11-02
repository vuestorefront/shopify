/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/shopify-api/src/types';
import { formatSelectedAttributeList } from './_utils';

export const getCartItems = (cart: Cart): LineItem[] => {
  return cart.lineItems;
};

export const getCartItemName = (product: any): string => product?.title || 'Product\'s name';
export const getCartItemId = (product: any): string => product.id || '0';
export const getCartItemSlug = (product: any): string => {
  return product.slug || '0';
};

export const getCartItemImage = (product: any): string => {
  if (product.variant && product?.variant?.image !== null) {
    const imgPath = product?.variant?.image?.src.substring(0, product?.variant.image.src.lastIndexOf('.'));
    const imgext = product?.variant?.image?.src.split('.').pop();
    const cartImg = imgPath + '_120x120.' + imgext;
    return cartImg;
  }
  return '';
};

export const getCartItemPrice = (product: any): AgnosticPrice => {
  return {
    regular: product?.variant?.compareAtPriceV2?.amount || null,
    special: product?.variant?.priceV2?.amount || null
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemQty = (product: LineItem): number => product?.quantity;

export const getCartItemAttributes = (product: LineItem) => {
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

export const getCartItemSku = (product: any): string => product?.variant.sku || '-';

export const getCartTotals = (cart): AgnosticTotals => {
  if (cart && cart !== null) {
    return {
      total: parseFloat(cart.totalPriceV2?.amount),
      subtotal: parseFloat(cart.subtotalPriceV2?.amount),
      special: parseFloat(cart.subtotalPriceV2?.amount),
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number => 0;

export const getCartSubTotal = (cart: Cart): number => cart.lineItemsSubtotalPrice || 0;

export const getcheckoutURL = (cart: Cart): string => cart.webUrl || '';

export const getCartTotalItems = (cart: Cart): number => cart?.lineItems?.length > 0 ? cart.lineItems.reduce((n, { quantity }) => n + quantity, 0):0;

export const getCartTotalDiscount = (cart: Cart): number => cart?.discountApplications.length > 0? cart.discountApplications[0].value : 0;

export const getAppliedCoupon = (cart: Cart): string => cart?.discountApplications.length > 0 ? cart.discountApplications[0].code : '';

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
  getItemId: getCartItemId,
  getItemSlug: getCartItemSlug,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getTotalDiscount:getCartTotalDiscount,
  getcheckoutURL,
  getSubTotal: getCartSubTotal,
  getCoupon: getAppliedCoupon,
  getCoupons,
  getDiscounts
};

export default cartGetters;
