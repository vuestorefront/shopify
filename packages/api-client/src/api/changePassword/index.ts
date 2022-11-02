import { gql } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { changePasswordMutation as mutation } from './../customerMutations/buildMutations';

export  async function changePassword(context, params, _customQuery?: CustomQuery) {
  const { token, newPassword } = params;
  
  const payload = {
    customerAccessToken: token,
      customer: {
        password: newPassword
      }
  }
  
  const { customerUpdate } = context.extendQuery(
      _customQuery,
    {
    customerUpdate: {
      mutation,
      payload
    }
  })
  
  return await context.client.apolloClient.mutate({
    mutation: gql(customerUpdate.mutation) as any,
    variables: customerUpdate.payload
  }).then((result) => {
    return result.data;
});
}
