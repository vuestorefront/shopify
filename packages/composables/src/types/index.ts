import { ProductVariant } from '@vue-storefront/shopify-api';
import { ShopifyApolloContext } from '@vue-storefront/shopify-apollo'

// New Types

export interface Context {
  $shopify: ShopifyApolloContext
  [key: string]: any
}


// Old Types
export { UseCategory, UseProduct } from '@vue-storefront/core';
export type Category = Record<string, unknown>;

export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  lastIncompleteCheckout?: string;
  displayName?: string;
  token?: string;
  tags?: Array<any>;
  error?: string;
  addresses?: Record<string, unknown>;
  defaultAddress?: Record<string, unknown>;
  acceptsMarketing?: boolean;
};

export type UserAddress = Record<string, unknown>;

export type ContentType = Record<string, unknown>;

export type ContentPosition = Record<string, unknown>;

export type Cart = Record<string, unknown>;

export type CartItem = Record<string, unknown>;

export type Coupon = Record<string, unknown>;

export type Order = Record<string, unknown>;

export type OrderItem = Record<string, unknown>;

export type Product = Record<string, unknown>;

export type Review = Record<string, unknown>;

export type ShippingMethod = Record<string, unknown>;

export type WishlistProduct = Record<string, unknown>;

export type Wishlist = Record<string, unknown>;

export type ProductsResponse = {
  data: Product[];
  total: number;
};

export type OrderSearchParams = Record<string, any>;

export type OrdersResponse = {
  data: any[];
  total: number;
};

export type Filter = {};
export interface FacetResultsData {
  products: ProductVariant[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
}
