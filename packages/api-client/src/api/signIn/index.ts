import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core';
import { signInMutation as mutation } from './../customerMutations/buildMutations';
export async function signIn(context, params, _customQuery?: CustomQuery) {
  const { username, password } = params;
  
  // Listen to inputs
  const payload = {
      email: username,
      password
  };

  const { customerAccessTokenCreate } = context.extendQuery(
      _customQuery,
      {
        customerAccessTokenCreate: {
          mutation,
          payload
        }
      }
  )
  
  return await context.client.apolloClient.mutate({
    mutation: gql(customerAccessTokenCreate.mutation) as any,
    variables: customerAccessTokenCreate.payload
  }).then((result) => {
    return result.data.customerAccessTokenCreate;
  });
}
