import { CustomQuery, ProductsSearchParams } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, ShopProductsArgs } from '../shopify'

export const DEFAULT_QUERY = `
    query products(
        $first: Int,
        $query: String
    ) {
        products(first: $first, query: $query) {
          edges {
              node {
                  title
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
                        available
                        compareAtPrice
                      }
                    }
                  }
                  tags
                  productType
                  options {
                    id
                    name
                    values
                  }
                  id
                  description
                  descriptionHtml
                  handle
              }
          }
        } 
    }
`


export default async function searchProduct(context: ShopifyApolloContext, params: ProductsSearchParams, customQuery?: CustomQuery) {
  const variables = {
    query: params.term,
    first: params.perPage ?? 5
  }

  const { products } = context.extendQuery(
    customQuery,
    {
      products: {
        query: DEFAULT_QUERY,
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, ShopProductsArgs>({
    query: gql(products.query) as any,
    variables: products.variables
  })

  return response ?? null
}