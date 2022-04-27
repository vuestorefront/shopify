/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core'
import { print } from 'graphql'
import { getCountry } from '../../helpers/utils';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function updateCart(context, params, _customQuery?: CustomQuery) {
  const { currentCart, product, quantity } = params;
  // Existing Checkout ID
  const lineItemsToUpdate = [{
    id: product.id,
    quantity
  }];


  const DEFAULT_MUTATION = gql`mutation checkoutLineItemsUpdate($country:CountryCode, $checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]! ) @inContext(country:$country){
  checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems){
    checkout{
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
              ... on DiscountCodeApplication {
                code
                allocationMethod
                targetType
                targetSelection
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
    lineItems: lineItemsToUpdate,
    country: getCountry(context),
    checkoutId: currentCart.id
  }

    const { checkoutLineItemsUpdate } = context.extendQuery(
      _customQuery,
      {
        checkoutLineItemsUpdate: {
          mutation: print(DEFAULT_MUTATION as any),
          payload
        }
      }
    )


  return await context.client.apolloClient.mutate({
    mutation: gql(checkoutLineItemsUpdate.mutation) as any,
    variables: checkoutLineItemsUpdate.payload
  }).then((result) => {
    const discountApplications = result.data.checkoutLineItemsUpdate.checkout.discountApplications.edges.map((discountApplications => discountApplications.node));
      const lineItems = result.data.checkoutLineItemsUpdate.checkout.lineItems.edges.map((lineItem => lineItem.node));
      delete (result.data.checkoutLineItemsUpdate.checkout.lineItems);
      delete (result.data.checkoutLineItemsUpdate.checkout.discountApplications);
      result.data.checkoutLineItemsUpdate.checkout = {
          ...result.data.checkoutLineItemsUpdate.checkout,
          discountApplications,
          lineItems
      };
    return result.data.checkoutLineItemsUpdate.checkout;
  });
}
