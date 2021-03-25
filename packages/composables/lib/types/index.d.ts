export { UseCategory, UseProduct } from '@vue-storefront/core';
export declare type Category = Record<string, unknown>;
import { ProductVariant } from '@vue-storefront/shopify-api';
export declare type User = {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    displayName?: string;
    token?: string;
    error?: string;
};
export declare type UserAddress = Record<string, unknown>;
export declare type Cart = Record<string, unknown>;
export declare type CartItem = Record<string, unknown>;
export declare type Coupon = Record<string, unknown>;
export declare type Order = Record<string, unknown>;
export declare type OrderItem = Record<string, unknown>;
export declare type Product = Record<string, unknown>;
export declare type Review = Record<string, unknown>;
export declare type ShippingMethod = Record<string, unknown>;
export declare type WishlistProduct = Record<string, unknown>;
export declare type Wishlist = Record<string, unknown>;
export declare type ProductsResponse = {
    data: Product[];
    total: number;
};
export declare type OrderSearchParams = Record<string, any>;
export declare type OrdersResponse = {
    data: any[];
    total: number;
};
export declare type Filter = {};
export interface FacetResultsData {
    products: ProductVariant[];
    categories: Category[];
    facets: Record<string, Filter>;
    total: number;
    perPageOptions: number[];
    itemsPerPage: number;
}
