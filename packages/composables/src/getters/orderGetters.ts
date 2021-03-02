/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* istanbul ignore file */

import { UserOrderGetters } from '@vue-storefront/core';
import { Order, OrderItem } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDate = (order: any): string => order?.processedAt || '123';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getId = (order: any): string => order?.orderNumber || '123';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStatus = (order: any): string => order?.fulfillmentStatus || 'Failed';
export const getPaymentStatus = (order: any): string => order?.financialStatus || 'Pending';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getPrice = (order: any): number | null => order.currentTotalPrice.amount || 0;
export const getSubtotalPrice = (order: any): number | null => order.currentSubtotalPrice.amount || 0;
export const getTaxPrice = (order: any): number | null => order.currentTotalTax.amount || 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (order: any): any[] => order.lineItems || [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemSku = (item: any): string => item?.sku || 0;

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

const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getId,
  getStatus,
  getPaymentStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getSubtotalPrice,
  getTaxPrice,
  getItemId,
  getItemSlug
};

export default orderGetters;
