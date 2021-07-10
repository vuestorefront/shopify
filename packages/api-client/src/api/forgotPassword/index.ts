/* eslint-disable @typescript-eslint/no-unused-vars */
import { forgotPasswordMutation as mutation } from './../customerMutations/buildMutations';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function forgotPassword(context, params) {
  const { username } = params;
  const data = {
    email: username
  };

  // Remove customer access token
  return await context.client.graphQLClient.send(mutation(context), data);
}
