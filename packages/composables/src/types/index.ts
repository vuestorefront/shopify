/* eslint-disable @typescript-eslint/ban-types */
export { UseCategory, UseProduct } from '@vue-storefront/core';
export type Category = Record<string, unknown>;
import { ProductVariant } from '@vue-storefront/shopify-api';

export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  displayName?: string;
  token?: string;
  error?: string;
};

export type UserAddress = Record<string, unknown>;

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
