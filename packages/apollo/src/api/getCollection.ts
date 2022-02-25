import { AgnosticFacetSearchParams, CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootCollectionArgs, ProductFilter } from '../shopify'
import { mapFacetToProductFilter } from '../helpers/mapFacetToProductFilter'

const defaultQuery = gql`
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
            totalInventory
            variants(first: 1) {
              edges {
                node {
                  price
                  availableForSale
                  compareAtPrice
                  priceV2{
                    amount
                    currencyCode
                  }
                  compareAtPriceV2{
                    amount
                    currencyCode
                  }
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

export default async function getCollection(context: ShopifyApolloContext, params: AgnosticFacetSearchParams, customQuery?: CustomQuery) {
  const variables = {
    handle: params.categorySlug,
    first: params.perPage ?? 5,
    filters: mapFacetToProductFilter(params.filters)
  }

  const { collection } = context.extendQuery(
    customQuery,
    {
      collection: {
        query: defaultQuery,
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