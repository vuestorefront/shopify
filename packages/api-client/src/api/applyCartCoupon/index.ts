/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core'
export async function applyCoupon(context, params, _customQuery?: CustomQuery) {
  const { currentCart, couponCode } = params;
  const DEFAULT_MUTATION = gql`mutation APPLY_COUPON($checkoutId: ID!, $discountCode: String!){ 
    checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
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
    discountCode: couponCode,
    checkoutId: currentCart.id
  }

    const { checkoutDiscountCodeApplyV2 } = context.extendQuery(
      _customQuery,
      {
        checkoutDiscountCodeApplyV2: {
          mutation: DEFAULT_MUTATION,
          payload
        }
      }
    )


  return await context.client.apolloClient.mutate({
    mutation: checkoutDiscountCodeApplyV2.mutation,
    variables: checkoutDiscountCodeApplyV2.payload
  }).then((result) => {
    const discountApplications = result.data.checkoutDiscountCodeApplyV2.checkout.discountApplications.edges.map((discountApplications => discountApplications.node));
    const lineItems = result.data.checkoutDiscountCodeApplyV2.checkout.lineItems.edges.map((lineItem => lineItem.node));
    const checkoutUserErrors = result.data.checkoutDiscountCodeApplyV2.checkoutUserErrors ? result.data.checkoutDiscountCodeApplyV2.checkoutUserErrors.map((UserErrors => UserErrors.message)) : [];
    delete (result.data.checkoutDiscountCodeApplyV2.checkout.lineItems);
    delete (result.data.checkoutDiscountCodeApplyV2.checkout.discountApplications);
    delete (result.data.checkoutDiscountCodeApplyV2.checkoutUserErrors);
    result.data.checkoutDiscountCodeApplyV2.checkout = {
        ...result.data.checkoutDiscountCodeApplyV2.checkout,
        discountApplications,
        lineItems,
        checkoutUserErrors,
        couponCode
    };
    return result.data.checkoutDiscountCodeApplyV2;
  });
}
