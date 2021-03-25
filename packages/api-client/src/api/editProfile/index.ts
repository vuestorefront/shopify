/* eslint-disable @typescript-eslint/no-unused-vars */
import { editProfileMutation as mutation } from './../customerMutations/buildMutations';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function editProfile(context, params) {
  const { token, profile } = params;
  const data = {
    customerAccessToken: token,
    customer: profile
  };
  // send user data to authenticate, return token if valid
  return await context.client.graphQLClient.send(mutation(context), data).then(({model}) => {
    return model;
  });
}
