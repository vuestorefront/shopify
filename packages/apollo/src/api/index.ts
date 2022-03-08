import { searchProduct } from './searchProduct'
import customerRecover from './customerRecover'
import customerCreate from './customerCreate'
import availableFilters from './availableFilters';
import getCollection from './getCollection';
import { getPage } from './getPage';
import getBlogs from './getBlogs';
import getBlog from './getBlog';

const apis = {
  searchProduct,
  customerRecover,
  customerCreate,
  availableFilters,
  getCollection,
  getPage,
  getBlogs,
  getBlog
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