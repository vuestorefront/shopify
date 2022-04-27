/* istanbul ignore file */

import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import { OrdersResponse, OrderSearchParams } from '../types';

const params: UseUserOrderFactoryParams<OrdersResponse, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params: OrderSearchParams): Promise<OrdersResponse> => {
    const app = context.$shopify.config.app;
    const appKey = app.$config.appKey;
    const token = app.$cookies.get(appKey + '_token');
    const result: any = await context.$shopify.api.fetchOrders(token);
    const orders = {data: [], total: 0};
    if (result) {
      orders.data = result.customer.orders;
      orders.total = result.customer.orders.length;
      return orders;
    }
    return orders;
  }
};

export default useUserOrderFactory<OrdersResponse, OrderSearchParams>(params);
