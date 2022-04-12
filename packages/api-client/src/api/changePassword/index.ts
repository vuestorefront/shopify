import { gql } from '@apollo/client/core';
import { changePasswordMutation as mutation } from './../customerMutations/buildMutations';

export  async function changePassword(context, params) {
  const { token, newPassword } = params;
  
  const payload = {
    customerAccessToken: token,
    customer: {
      password: newPassword
    }
  };

  const { customerUpdate } = context.extendQuery({
    customerUpdate: {
      mutation,
      variables: payload
    }
  })

  return await context.client.apolloClient.mutate({
    mutation: gql(customerUpdate.mutation) as any,
    variables: customerUpdate.payload
  }).then((result) => {
    return result.data.customerUpdate;
  });  
}
