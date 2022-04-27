import { gql } from "@apollo/client/core";

export const SearchProductQuery = gql`
    query products(
        $first: Int,
        $query: String,
        $country: CountryCode!
    ) @inContext(country: $country) {
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