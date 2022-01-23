import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootProductsArgs } from '../shopify'

export const DEFAULT_QUERY = `
query GET_PRODUCT($handle: String, $country: CountryCode) @inContext(country: $country) {
    product(handle: $handle) {
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
            priceV2 {
              amount
              currencyCode
            }
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
  
`

export default async function getProductV2(context: ShopifyApolloContext, params: Record<string, string | number>, customQuery?: CustomQuery) {
  const variables = {
    ...params,
    country: context.config.country
  }

  const { product } = context.extendQuery(
    customQuery,
    {
      product: {
        query: DEFAULT_QUERY,
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, QueryRootProductsArgs>({
    query: gql(product.query) as any,
    variables: product.variables
  })

  return response ?? null
}