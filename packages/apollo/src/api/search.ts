import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootArticlesArgs, QueryRootProductsArgs } from '../shopify'
import { SearchParams } from '../types/SearchParams'


export async function searchProduct(context: ShopifyApolloContext, params: SearchParams, customQuery?: CustomQuery) {
  const searchQuery = gql`
query search(
    $first: Int,
    $query: String
) {
    articles(first: $first, query: $query) {
      edges {
        node {
          id
          handle
          onlineStoreUrl
          publishedAt
          tags
          title
          content(truncateAt: $truncateContent)
          image {
            transformedSrc
            altText
            url
          }
          seo {
            description
            title
          }
          blog {
            handle
            title
          }
        }
      }
    }
    products(first: $first, query: $query) {
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
              variants(first:20){
                edges{
                  node{
                    id
                    title
                    weight
                    availableForSale
                    sku
                    priceV2{
                      amount
                      currencyCode
                    }
                    compareAtPriceV2{
                      amount
                      currencyCode
                    }
                    image{
                      id
                      altText
                      originalSrc
                      transformedSrc
                    }
                    selectedOptions{
                      name
                      value
                    }
                    product{
                      id
                      title
                      availableForSale
                      handle
                      description
                      descriptionHtml
                      images(first:20){
                        edges{
                          node{
                            id
                            altText
                            originalSrc
                            transformedSrc
                          }
                        }
                      }
                      productType
                      options{
                        id
                        name
                        values
                      }
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
`

  const variables = {
    query: params.query,
    first: params.first ?? 5
  }

  const { search } = context.extendQuery(
    customQuery,
    {
      search: {
        query: searchQuery,
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, QueryRootProductsArgs | QueryRootArticlesArgs>({
    query: search.query,
    variables: search.variables
  })

  return response ?? null
}