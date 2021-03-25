declare const customerQuery: (token: string, context: any) => any;
declare const ordersQuery: (pages: number, token: string, context: any) => any;
declare const addressesQuery: (pages: number, token: string, context: any) => any;
export { customerQuery, ordersQuery, addressesQuery };
