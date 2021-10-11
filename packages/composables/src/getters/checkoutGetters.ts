import { ShippingMethod } from '@vue-storefront/shopify-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodId = (shippingMethod: ShippingMethod): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodName = (shippingMethod: ShippingMethod): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => 0;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getFormattedPrice = (price: number) => String(price);

const checkoutGetters = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getFormattedPrice,
  getShippingMethodPrice
};

export default checkoutGetters;
