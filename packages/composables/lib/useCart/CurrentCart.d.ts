import { Context } from '@vue-storefront/core';
declare const loadCurrentCart: (context: Context, customQueryFn?: (user?: any, cart?: any) => {
    cart: any;
    user: any;
}) => Promise<any>;
export default loadCurrentCart;
