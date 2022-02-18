/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core'
import { print } from 'graphql'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function checkOut(context, checkoutId, customQuery?: CustomQuery) {
  const DEFAULT_QUERY = `
  query FETCH_CHECKOUT($country: CountryCode!, $id: ID!) @inContext(country: $country ) {
    node(id: $id) {
      id
      ... on Checkout {
        appliedGiftCards{
          id
          amountUsedV2{
            currencyCode
            amount
          }
          balanceV2{
            currencyCode
            amount
          }
          
        }
        completedAt
        createdAt
        currencyCode
        customAttributes{
          key
          value
        }
        discountApplications(first:20){
          edges{
            node{
              value{
                ... on MoneyV2{
                  amount
                  currencyCode
                }
                ... on PricingPercentageValue{
                  percentage
                }
              }
            }
          }
        }
        email
        id
        lineItems(first:250){
          edges{
            node{
              customAttributes{
                key
                value
              }
              id
              quantity
              title
              variant{
                availableForSale
                compareAtPriceV2{
                  currencyCode
                  amount
                }
                id
                image{
                  altText
                  id
                  height
                  width
                  src
                }
                priceV2{
                  currencyCode
                  amount
                }
                compareAtPriceV2{
                  currencyCode
                  amount
                }
                product{
                  handle
                  id
                }
                selectedOptions{
                  name
                  value
                }
                sku
                title
                unitPrice{
                  currencyCode
                  amount
                }
              }
            }
          }
        }
        lineItemsSubtotalPrice{
          currencyCode
          amount
        }
        note
        order {
          id
        }
        orderStatusUrl
        paymentDueV2{
          currencyCode
          amount
        }
        ready
        requiresShipping
        shippingAddress {
          id
        }
        shippingLine{
          handle
          priceV2{
            currencyCode
            amount
          }
          title
        }
        subtotalPriceV2{
          currencyCode
          amount
        }
        taxExempt
        taxesIncluded
        totalPriceV2{
          currencyCode
          amount
        }
        totalTaxV2{
          currencyCode
          amount
        }
        updatedAt
        webUrl
      }
      }
    }`

  const payload = {
    id: checkoutId,
    country: (context.res.req.cookies['vsf-locale'] === "en") ? "US" : (context.res.req.cookies['vsf-locale']).toUpperCase()
  }

  const { node } = context.extendQuery(
    customQuery,
    {
      node: {
        query: DEFAULT_QUERY as any,
        variables: payload
      }
    }
  )

  return await context.client.apolloClient.query({
    query: gql(node.query) as any,
    variables: node.variables
  }).then((result) => {
    const discountApplications = result.data.node.discountApplications.edges.map((discountApplications => discountApplications.node));
    const lineItems = result.data.node.lineItems.edges.map((lineItem => lineItem.node));
    const newResult = {
      ...result,
      data: {
        ...result.data,
        node: {
          ...result.data.node,
          discountApplications,
          lineItems
        }
      }
    }
    return newResult.data.node
  })

}
