import { CustomQuery, ProductsSearchParams } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { print } from 'graphql'
import { ShopifyApolloContext } from '../library'
import { ProductConnection, ShopProductsArgs } from '../shopify'

const DEFAULT_QUERY = gql`
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
        query: print(DEFAULT_QUERY as any),
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query<ProductConnection, ShopProductsArgs>({
    query: gql(products.query) as any,
    variables: products.variables
  })

  console.log(response)

  return response ?? null
}