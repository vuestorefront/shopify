import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core';
import { getCountry } from '../../helpers/utils';
export async function removeFromCart(context, params, _customQuery?: CustomQuery) {
  const { currentCart, product } = params;
  // products to be remove
  const lineItemIdsToRemove = [
    product.id
  ];

  const DEFAULT_MUTATION = `mutation checkoutLineItemsRemove($country:CountryCode, $checkoutId: ID!, $lineItemIds: [ID!]!) @inContext(country:$country){
  checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds){
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
    lineItemIds: lineItemIdsToRemove,
    country: getCountry(context),
    checkoutId: currentCart.id
  }

    const { checkoutLineItemsRemove } = context.extendQuery(
      _customQuery,
      {
        checkoutLineItemsRemove: {
          mutation: DEFAULT_MUTATION,
          payload
        }
      }
    )


  return await context.client.apolloClient.mutate({
    mutation: gql(checkoutLineItemsRemove.mutation) as any,
    variables: checkoutLineItemsRemove.payload
  }).then((result) => {
    const discountApplications = result.data.checkoutLineItemsRemove.checkout.discountApplications.edges.map((discountApplications => discountApplications.node));
      const lineItems = result.data.checkoutLineItemsRemove.checkout.lineItems.edges.map((lineItem => lineItem.node));
      delete (result.data.checkoutLineItemsRemove.checkout.lineItems);
      delete (result.data.checkoutLineItemsRemove.checkout.discountApplications);
      result.data.checkoutLineItemsRemove.checkout = {
          ...result.data.checkoutLineItemsRemove.checkout,
          discountApplications,
          lineItems
      };
    return result.data.checkoutLineItemsRemove.checkout;
  });
}
