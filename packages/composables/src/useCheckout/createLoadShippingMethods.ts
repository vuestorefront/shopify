/* eslint-disable @typescript-eslint/no-unused-vars */

import { getShippingMethods } from '@vue-storefront/shopify-api';
import { shippingMethods, isShippingAddressCompleted, loading } from './shared';
import { CustomQuery } from '@vue-storefront/core';

const createLoadShippingMethods = ({ factoryParams, setShippingMethod, cartFields }, customQuery?: CustomQuery) => async () => {
  if (!isShippingAddressCompleted.value) return;
  loading.value.shippingMethods = true;

  try {
    const shippingMethodsResponse = await getShippingMethods(cartFields.cart.value.id, customQuery);
    shippingMethods.value = shippingMethodsResponse.data.shippingMethods;
  } finally {
    loading.value.shippingMethods = false;
  }
};

export default createLoadShippingMethods;
