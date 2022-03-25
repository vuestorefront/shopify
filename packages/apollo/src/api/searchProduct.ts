import { CustomQuery, ProductsSearchParams } from '@vue-storefront/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootProductsArgs } from '../shopify'
import { SearchProductQuery } from '../query/SearchProduct.gql'

export async function searchProduct(context: ShopifyApolloContext, params: ProductsSearchParams, customQuery?: CustomQuery) {
  const variables = {
    query: params.term,
    first: params.perPage ?? 5
  }

  const { products } = context.extendQuery(
    customQuery,
    {
      products: {
        query: SearchProductQuery,
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, QueryRootProductsArgs>({
    query: products.query,
    variables: products.variables
  })

  return response ?? null
}