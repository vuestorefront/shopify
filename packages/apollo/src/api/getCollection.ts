import { AgnosticFacetSearchParams, CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootCollectionArgs, ProductFilter } from '../shopify'

const DEFAULT_QUERY = gql`
query collection($handle: String, $first: Int, $filters: [ProductFilter!]) {
  collection(handle: $handle) {
    id
    handle
    title
    description
    descriptionHtml
    updatedAt
    image {
      src
      url
    }
    products(filters: $filters, first: $first) {
      edges {
        node {
          images(first: 1) {
            edges {
              node {
                src
                originalSrc
                id
                height
                width
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price
                availableForSale
                compareAtPrice
              }
            }
          }
          options {
            id
            name
            values
          }
          tags
          productType
          title
          vendor
          publishedAt
          createdAt
          updatedAt
          publishedAt
          id
          description
          descriptionHtml
          handle
        }
      }
    }
  }
}
`

type GetCollectionQueryArgs = QueryRootCollectionArgs & ProductFilter

const PRICE_FILTER_RANGE = ['min', 'max']

function convertFacetFiltersLocalToShopify(filters: Record<string, any>): ProductFilter {
    const result: ProductFilter = {}

    for (const key of Object.keys(filters)) {
        // This condition will set the price range filter
        if (PRICE_FILTER_RANGE.includes(key)) {
            result.price = result.price ?
                { ...result.price, [key]: parseFloat(filters[key]) } :
                { [key]: parseFloat(filters[key]) }
        }
    }

    return result
}

export default async function getCollection(context: ShopifyApolloContext, params: AgnosticFacetSearchParams, customQuery?: CustomQuery) {
  const variables = {
    handle: params.categorySlug,
    first: params.perPage ?? 5,
    filters: convertFacetFiltersLocalToShopify(params.filters)
  }

  const { collection } = context.extendQuery(
    customQuery,
    {
      collection: {
        query: DEFAULT_QUERY,
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, GetCollectionQueryArgs>({
    query: collection.query,
    variables: collection.variables
  })

  return response ?? null
}