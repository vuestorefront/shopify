import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { CustomerCreateInput } from '../shopify'


const DEFAULT_MUTATION = gql`
    mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
            customer {
              id
            }
            customerUserErrors {
              code
              field
              message
            }
          }
    }
`

export default async function customerCreate(context: ShopifyApolloContext, params: CustomerCreateInput) {
  const variables = {
      input: params
  }

  const response = await context.client.apolloClient.mutate({
    mutation: DEFAULT_MUTATION as any,
    variables
  })

  return response.data.customerCreate
}