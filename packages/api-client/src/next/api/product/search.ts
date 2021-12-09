import { CustomQuery, ProductsSearchParams } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { print } from 'graphql'
import { ShopifyIntegrationContext } from '../../types/context'
import { ProductConnection, ShopProductsArgs } from '../../types/shopify'

export const DEFAULT_QUERY = gql`
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

  const response = await context.client.apolloClient.query<ProductConnection, ShopProductsArgs>({
    query: gql(products.query),
    variables: products.variables
  })

  return response ?? null
}