import { signOutMutation as mutation } from './../customerMutations/buildMutations';
import { gql } from '@apollo/client/core';

export async function signOut(context, params) {
  // Retrieve customer token
  const payload = {
    customerAccessToken: params
  };

  const { customerAccessTokenDelete } = context.extendQuery(
      {
        customerAccessTokenDelete: {
          mutation,
          payload
        }
      }
  )
  
  return await context.client.apolloClient.mutate({
    mutation: gql(customerAccessTokenDelete.mutation) as any,
    variables: customerAccessTokenDelete.payload
  }).then((result) => {
    return result.data.customerAccessTokenDelete;
  });
}
