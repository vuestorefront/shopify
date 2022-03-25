/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function removeCoupon(context, params, _customQuery?: CustomQuery) {
  const { currentCart, couponCode, customQuery } = params;
  const DEFAULT_MUTATION = gql`mutation REMOVE_COUPON($checkoutId: ID!){ 
    checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
        checkout {
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
      checkoutUserErrors {
          code
          field
          message
      }
    }
  }`
  const payload = {
    checkoutId: currentCart.id
  }

    const { checkoutDiscountCodeRemove } = context.extendQuery(
      _customQuery,
      {
        checkoutDiscountCodeRemove: {
          mutation: DEFAULT_MUTATION,
          payload
        }
      }
    )


  return await context.client.apolloClient.mutate({
    mutation: checkoutDiscountCodeRemove.mutation,
    variables: checkoutDiscountCodeRemove.payload
  }).then((result) => {
    const discountApplications = result.data.checkoutDiscountCodeRemove.checkout.discountApplications.edges.map((discountApplications => discountApplications.node));
    const lineItems = result.data.checkoutDiscountCodeRemove.checkout.lineItems.edges.map((lineItem => lineItem.node));
    const checkoutUserErrors = result.data.checkoutDiscountCodeRemove.checkoutUserErrors ? result.data.checkoutDiscountCodeRemove.checkoutUserErrors.map((UserErrors => UserErrors.message)) : [];
    delete (result.data.checkoutDiscountCodeRemove.checkout.lineItems);
    delete (result.data.checkoutDiscountCodeRemove.checkout.discountApplications);
    delete (result.data.checkoutDiscountCodeRemove.checkoutUserErrors);
    result.data.checkoutDiscountCodeRemove.checkout = {
        ...result.data.checkoutDiscountCodeRemove.checkout,
        discountApplications,
        lineItems,
        checkoutUserErrors
    };
    return result.data.checkoutDiscountCodeRemove;
  });
}
