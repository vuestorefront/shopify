/* eslint-disable @typescript-eslint/no-unused-vars */
import { signOutMutation as mutation } from './../customerMutations/buildMutations';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function signOut(context, params) {
  const data = {
    customerAccessToken: params
  };

  // Remove customer access token
  return await context.client.graphQLClient.send(mutation(context), data).then(({model}) => {
    return model;
  });
}
