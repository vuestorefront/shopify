# useSearch composable

`useSearch` composition API function is responsible, as it's name suggests for interactions with searching from your eCommerce. This function returns following values:

- `search` - a main querying function that is used to search products from eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object
    - The `params` has the following options:
        - `perPage` (Int) Max number `n` of elements from the list.
        - `term` (String) A term string.
- `result: EndpointResult` - a main data object that contains an array of products fetched by `search` method

```typescript
export type Maybe<T> = T | null;

export type Image = {
  id: Maybe<string>;
  src: Maybe<string>;
  altText: Maybe<string>;
}

export type Price = {
  amount: Maybe<number>;
  currencyCode: Maybe<string>;
}

export type Option = {
  name: Maybe<string>;
  value: Maybe<any>;
}

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
  _availableForSale?: Maybe<Scalars['Boolean']>;
}

export type Product = {
  id: Maybe<string>;
  handle: Maybe<string>;
  images: Maybe<Image[]>;
  options: Maybe<Option[]>;
  productType: Maybe<string>;
  publishedAt: Maybe<any>;
  title: Maybe<string>;
  description: Maybe<string>;
  descriptionHtml: Maybe<string>;
  updatedAt: Maybe<any>;
  createdAt: Maybe<any>;
  availableForSale: Maybe<boolean>;
  variants: Maybe<ProductVariant[]>;
  vendor: Maybe<string>;
}
```
- `loading` - a reactive object containing information about loading state of your `search` method

## Examples

```javascript
import { watch } from 'vue'
import { onSSR } from '@vue-storefront/core';
import { useSearch, searchGetters } from '@vue-storefront/shopify';

export default {
  setup(props, context) {
    const { search, result } = useSearch();
    
    const searchQuery = ref("");
    // Take note of this line the result should be pass through 
    // searchGetters.getItems() to extract only array of Product
    const productsFound = computed(() => searchGetters.getItems(result.value));

    watch(searchQuery, () => {
      if (searchQuery.length > 2) {
        search({ term: searchQuery.value });
      }
    })

    onSSR(async () => {
      await search({ term: "" });
    });

    return {
      productsFound,
      searchQuery
    };
  }
};
```
