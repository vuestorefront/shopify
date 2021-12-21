import searchProduct from './searchProduct'
import customerRecover from './customerRecover'
import customerCreate from './customerCreate'
import recoverPassword from './recoverPassword'

const apis = {
  searchProduct,
  customerRecover,
  customerCreate,
  recoverPassword
}

export type ShopifyApolloAPIs = {
  [T in keyof typeof apis]: (typeof apis)[T] extends (
    x: any,
    ...args: infer P
  ) => infer R
  ? (...args: P) => R
  : never;
};

export function getShopifyApolloAPIs(): ShopifyApolloAPIs {
  return apis as any
}