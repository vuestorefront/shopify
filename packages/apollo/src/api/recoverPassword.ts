import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { CustomerRecoverPayload, MutationCustomerRecoverArgs } from '../shopify'


const DEFAULT_MUTATION = gql`
    mutation recoverPassword($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
`

export default async function recoverPassword(context: ShopifyApolloContext, params: MutationCustomerRecoverArgs) {
  const variables = {
    email: params.email
  }

  const response = await context.client.apolloClient.mutate<CustomerRecoverPayload, MutationCustomerRecoverArgs>({
    mutation: DEFAULT_MUTATION as any,
    variables
  })

  return response
}