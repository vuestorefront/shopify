/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* istanbul ignore file */

import { UserOrderGetters } from '@vue-storefront/core';
import { Order, OrderItem } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDate = (order: any): any => {
  const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const OrderDate = new Date(order?.processedAt);
  return monthsArray[OrderDate.getMonth()] + ' ' + OrderDate.getDate() + ', ' + OrderDate.getFullYear() + ' at ' + OrderDate.getHours() + ':' + OrderDate.getMinutes();
};

export const getTracking = (order: any): string => {
  if (order.fulfillmentStatus === 'FULFILLED' && order.successfulFulfillments[0].trackingInfo.length > 0) {
    return order.successfulFulfillments[0].trackingInfo[0].number;
  }
  return ' - ';
};
export const getTrackingUrl = (order: any): string => {
  if (order.fulfillmentStatus === 'FULFILLED' && order.successfulFulfillments[0].trackingInfo.length > 0) {
    return order.successfulFulfillments[0].trackingInfo[0].url;
  }
  return '';
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getId = (order: any): string => order?.orderNumber || '123';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStatus = (order: any): string => order?.fulfillmentStatus || 'Failed';
export const getPaymentStatus = (order: any): string => order?.financialStatus || 'Pending';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getPrice = (order: any): number | null => order.currentTotalPrice.amount || 0;
export const getSubtotalPrice = (order: any): number | null => order.currentSubtotalPrice.amount || 0;
export const getTaxPrice = (order: any): number | null => order.currentTotalTax.amount || 0;
export const getShippingPrice = (order: any): number | null => order.totalShippingPriceV2.amount || 0;
export const getShippingAddress = (order: any): string | null => {
  if (order.shippingAddress) {
    return order?.shippingAddress?.formatted || 'No shipping address available';
  }
  return 'No shipping address available';
};
export const getCustomerName = (order: any): string | null => order?.shippingAddress?.name || ' - ';
export const getCustomerPhone = (order: any): string | null => order?.shippingAddress?.phone || '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (order: any): any[] => order.lineItems || [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemSku = (item: any): string => item?.variant.sku || '-';
export const getItemImage = (item: any): string => {
  if (item && item?.variant.image) {
    const imgPath = item?.variant.image.originalSrc.substring(0, item?.variant.image.originalSrc.lastIndexOf('.'));
    const imgext = item?.variant.image.originalSrc.split('.').pop();
    const resizedImg = imgPath + '_100x100.' + imgext;
    return resizedImg;
  }
  return 'https://cdn.shopify.com/s/files/1/0102/2866/2368/files/placeholder-pdc_100x100.png?v=1621945081';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemName = (item: any): string => item?.title || 0;

export const getItemId = (item: any): string => item?.variant.product.id || '';

export const getItemSlug = (item: any): string => item?.variant.product.handle || '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemQty = (item: any): number => item?.quantity || 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemPrice = (item: any): number => item?.originalTotalPrice?.amount || 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number) => String(price);
// eslint-disable-next-line
function getOrdersTotal(orders: any): number {
  return 1;
}
const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getTracking,
  getTrackingUrl,
  getCustomerName,
  getCustomerPhone,
  getShippingAddress,
  getId,
  getStatus,
  getPaymentStatus,
  getPrice,
  getShippingPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getItemImage,
  getFormattedPrice,
  getSubtotalPrice,
  getTaxPrice,
  getItemId,
  getItemSlug,
  getOrdersTotal
};

export default orderGetters;
