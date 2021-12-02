import { CustomQuery, ProductsSearchParams } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { print } from 'graphql'
import { ShopifyIntegrationContext } from '../../types/context'
import { ShopProductsArgs } from 'packages/api-client/src'

export const DEFAULT_QUERY = gql`
    query products(
        $first: Int,
        $query: String
    ) {
        products(first: $first, query: $query) {
            edges {
                node {
                    id
                    title
                    description
                }
            }
        }
    }
`

export async function searchProduct(context: ShopifyIntegrationContext, params: ProductsSearchParams, customQuery?: CustomQuery) {
  const variables: ShopProductsArgs = {
    query: params.term,
    first: params.perPage ?? 5
  }

  const { products } = context.extendQuery(
    customQuery,
    {
      products: {
        query: print(DEFAULT_QUERY),
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query({
    query: gql(products.query),
    variables: products.variables
  })

  return response?.data ?? []
}