import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core'
import { getCountry } from '../../helpers/utils'
export async function addToCart(context, params, _customQuery?: CustomQuery) {
  const { currentCart, product, quantity, customQuery } = params;
  // Items to be add to cart
  const lineItemsToAdd = [{
    variantId: product.variantBySelectedOptions && product.variantBySelectedOptions !== null ? product.variantBySelectedOptions.id : product.variantId,
    quantity,
    customAttributes: customQuery
  }];
  const DEFAULT_MUTATION = gql`mutation checkoutLineItemsAdd($country:CountryCode, $checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]! ) @inContext(country:$country){
  checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems){
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
    lineItems: lineItemsToAdd,
    country: getCountry(context),
    checkoutId: currentCart.id
  }

    const { checkoutLineItemsAdd } = context.extendQuery(
      customQuery,
      {
        checkoutLineItemsAdd: {
          mutation: DEFAULT_MUTATION,
          payload
        }
      }
    )


  return await context.client.apolloClient.mutate({
    mutation: checkoutLineItemsAdd.mutation,
    variables: checkoutLineItemsAdd.payload
  }).then((result) => {
    const discountApplications = result.data.checkoutLineItemsAdd.checkout.discountApplications.edges.map((discountApplications => discountApplications.node));
      const lineItems = result.data.checkoutLineItemsAdd.checkout.lineItems.edges.map((lineItem => lineItem.node));
      delete (result.data.checkoutLineItemsAdd.checkout.lineItems);
      delete (result.data.checkoutLineItemsAdd.checkout.discountApplications);
      result.data.checkoutLineItemsAdd.checkout = {
          ...result.data.checkoutLineItemsAdd.checkout,
          discountApplications,
          lineItems
      };
    return result.data.checkoutLineItemsAdd.checkout;
  });
}
