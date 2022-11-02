
import { gql } from '@apollo/client/core';
import { forgotPasswordMutation as mutation } from './../customerMutations/buildMutations';

export async function forgotPassword(context, params) {
  const { username } = params;

  const payload = {
    email: username
  };

  const { customerRecover } = context.extendQuery(
    {
      customerRecover: {
        mutation,
        payload
      }
    }
  );

  return await context.client.apolloClient.mutate({
    mutation: gql(customerRecover.mutation) as any,
    variables: customerRecover.payload
  }).then((result) => { 
    return result.data.customerUserErrors
  });
}
