import { GetMeParams } from '../api/getMe';
import { Cart, CartDraft, ProductVariant, CartQueryInterface } from './graphQL';
export interface ApiInstance {
    addToCart({ id, version }: Cart, product: ProductVariant, quantity: number, customQuery?: CustomQueryFn): any;
    createCart(cartDraft?: CartData, customQueryFn?: CustomQueryFn): Promise<{
        data: CartQueryInterface;
    }>;
    getCart(cartId: string): any;
    getCategory(params: any, customQueryFn?: CustomQueryFn): any;
    getMe(params?: GetMeParams, customQueryFn?: CustomQueryFn): any;
    getProduct(params: any, customQueryFn?: CustomQueryFn): any;
    isGuest: () => boolean;
}
export declare type CustomQueryFn<T = any> = (query: any, variables: T) => {
    query?: any;
    variables?: T;
};
export interface BaseSearch {
    limit?: number;
    offset?: number;
    sort?: string[];
}
export interface ProductWhereSearch extends BaseSearch {
    catId?: string | string[];
    skus?: string[];
    slug?: string;
    id?: string;
    filters?: Filter[];
}
export interface Filter {
    type: AttributeType;
    name: string;
    value: any;
}
export interface FilterOption {
    label: string;
    value: string | number | boolean | [number, number] | [string, string];
    selected: boolean;
}
export interface CategoryWhereSearch extends BaseSearch {
    catId?: string;
    slug?: string;
}
export interface OrderWhereSearch extends BaseSearch {
    id?: string;
}
export declare enum AttributeType {
    STRING = "StringAttribute",
    DATE = "DateAttribute",
    DATETIME = "DateTimeAttribute",
    TIME = "TimeAttribute",
    NUMBER = "NumberAttribute",
    ENUM = "EnumAttribute",
    LOCALIZED_ENUM = "LocalizedEnumAttribute",
    LOCALIZED_STRING = "LocalizedStringAttribute",
    MONEY = "MoneyAttribute",
    BOOLEAN = "BooleanAttribute"
}
export interface CartData extends Omit<CartDraft, 'currency'> {
    currency?: string;
}
