import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core';
import { signUpMutation as mutation } from './../customerMutations/buildMutations';

export async function signUp(context, params, customQuery?: CustomQuery) {
  const payload = {
    input: params
  };

 const { customerCreate } = context.extendQuery(
      customQuery,
      {
        customerCreate: {
          mutation,
          payload
        }
      }
  )
  
  return await context.client.apolloClient.mutate({
    mutation: gql(customerCreate.mutation) as any,
    variables: customerCreate.payload
  }).then((result) => {
    return result.data.customerCreate;
  });
}
