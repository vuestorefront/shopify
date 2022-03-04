import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core'
import { getCountry } from '../../helpers/utils'

export default async function createCart(context, _params, _customQuery?: CustomQuery) {

  const DEFAULT_MUTATION = gql`mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input:$input){
      checkout{
        id
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
    input: {
      buyerIdentity: {
        countryCode: getCountry(context)
      }
    }
  }

  const { checkoutCreate } = context.extendQuery(
      _customQuery,
      {
        checkoutCreate: {
          mutation: DEFAULT_MUTATION,
          payload
        }
      }
  )
  return await context.client.apolloClient.mutate({
    mutation: checkoutCreate.mutation,
    variables: checkoutCreate.payload
  }).then((result) => {
    return result.data.checkoutCreate.checkout;
  });
}
