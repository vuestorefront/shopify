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
    console.log('Mocked: searchOrders');
    const token = context.$shopify.config.app.$cookies.get('token');
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
