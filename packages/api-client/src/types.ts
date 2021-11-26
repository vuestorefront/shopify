/* eslint-disable @typescript-eslint/ban-types */
type Maybe<T> = T | null;
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;

  /** The `Long` scalar type represents non-fractional signed whole numeric values.
   * Long can represent values between -(2^63) and 2^63 - 1.
   */
  Long: any;

  /** DateTime is a scalar value that represents an ISO8601 formatted date and time. */
  DateTime: any;

  /** [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) country code. */
  Country: any;

  /** Locale is a scalar value represented as a string language tag. */
  Locale: any;

  /** DateTime is a scalar value that represents an ISO8601 formatted date. */
  Date: any;

  /** Raw JSON value */
  Json: any;

  /** Array */
  Array: any;

  /** Represents a currency. Currencies are identified by their [ISO
   * 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) currency codes.
   */
  Currency: any;

  /** A key that references a resource. */
  KeyReferenceInput: any;

  /** Search filter. It is represented as a string and has th same format as in REST API: "field:filter_criteria" */
  SearchFilter: any;

  /** Search sort */
  SearchSort: any;

  /** YearMonth is a scalar value that represents an ISO8601 formatted year and month. */
  YearMonth: any;

  /** The `BigDecimal` scalar type represents signed fractional values with arbitrary precision. */
  BigDecimal: any;

  /** Time is a scalar value that represents an ISO8601 formatted time. */
  Time: any;
};
export type Cart = {
  __typename?: 'Cart';
  appliedGiftCards: Maybe<Scalars['Array']>;
  completedAt: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['String']>;
  currencyCode: Maybe<Scalars['String']>;
  customAttributes: Maybe<Scalars['Array']>;
  discountApplications: Maybe<Scalars['Array']>;
  email: Maybe<Scalars['String']>;
  errors: Maybe<Scalars['Json']>;
  id: Maybe<Scalars['String']>;
  lineItems?: Maybe<Scalars['Array']>;
  lineItemsSubtotalPrice?: Maybe<Scalars['Json']>;
  note?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  orderStatusUrl?: Maybe<Scalars['String']>;
  paymentDue?: Maybe<Scalars['String']>;
  ready?: Maybe<Scalars['String']>;
  requiresShipping?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<Scalars['Json']>;
  shippingLine?: Maybe<Scalars['String']>;
  subtotalPrice?: Maybe<Scalars['String']>;
  taxExempt?: Maybe<Scalars['String']>;
  taxesIncluded?: Maybe<Scalars['String']>;
  totalPrice?: Maybe<Scalars['String']>;
  totalTax?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  userErrors?: Maybe<Scalars['Array']>;
  webUrl?: Maybe<Scalars['String']>;
}

export type CartItem = {
  __typename?: 'CartItem';
  id: Maybe<Scalars['String']>;
  variant?: Maybe<Scalars['Array']>;
}
export type Wishlist = {}
export type ProductVariant = {
  __typename?: 'ProductVariant';
  _id?: Maybe<Scalars['String']>;
  _description: Maybe<Scalars['String']>;
  _descriptionHtml: Maybe<Scalars['String']>;
  _slug: Maybe<Scalars['String']>;
  _categoriesRef: string[];
  name: Maybe<Scalars['String']>;
  images: Maybe<Scalars['Array']>;
  product?: Maybe<Scalars['Array']>;
  options: Maybe<Scalars['Array']>;
  variantBySelectedOptions?: Maybe<Scalars['Array']>;
  _coverImage: Maybe<Scalars['String']>;
  price: {
    original: number;
    current: number;
  };
  variants?: Maybe<Scalars['Array']>;
  available?: Maybe<Scalars['Boolean']>;
  productType: Maybe<Scalars['String']>;
  availableForSale?: Maybe<Scalars['Boolean']>;
  totalInventory?: Maybe<Scalars['Int']>;
}

export type Category = {
  id: number;
  name: string;
  slug: string;
  items: Category[];
}
export type CategoryFilter = {}
export type ShippingMethod = {}
export type LineItem = {
  __typename?: 'LineItem';
  customAttributes: Maybe<Scalars['Array']>;
  discountAllocations: Maybe<Scalars['Array']>;
  hasNextPage: Maybe<Scalars['String']>;
  hasPreviousPage: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Int']>;
  title: Maybe<Scalars['String']>;
  variant: {
    available: Maybe<Scalars['Boolean']>;
    compareAtPriceV2: Maybe<Scalars['String']>;
    currentlyNotInStock: Maybe<Scalars['Boolean']>;
    id: Maybe<Scalars['String']>;
    image: {
      altText: Maybe<Scalars['String']>;
      id: Maybe<Scalars['String']>;
      src: Maybe<Scalars['String']>;
    };
    price: Maybe<Scalars['String']>;
    compareAtPrice: Maybe<Scalars['String']>;
    priceV2: Maybe<Scalars['Json']>;
    product: Maybe<Scalars['Json']>;
    quantityAvailable: Maybe<Scalars['Int']>;
    sku: Maybe<Scalars['String']>;
    title: Maybe<Scalars['String']>;
    unitPrice: Maybe<Scalars['String']>;
    weight: Maybe<Scalars['Float']>;
    selectedOptions?: Maybe<Scalars['Array']>;
  };
};
