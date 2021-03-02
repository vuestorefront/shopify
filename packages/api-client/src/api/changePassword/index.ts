/* eslint-disable @typescript-eslint/no-unused-vars */
import { changePasswordMutation as mutation } from './../customerMutations/buildMutations';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function changePassword(context, params) {
  const { token, newPassword } = params;
  const data = {
    customerAccessToken: token,
    customer: {
      password: newPassword
    }
  };

  // Remove customer access token
  return await context.CustomClient.graphQLClient.send(mutation, data).then(({model}) => {
    return model;
  });
}
