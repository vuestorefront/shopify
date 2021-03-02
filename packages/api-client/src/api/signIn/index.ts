/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { signInMutation as mutation } from './../customerMutations/buildMutations';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function signIn(context, params, customQuery?: CustomQuery) {
  const { username, password } = params;
  const data = {
    input: {
      email: username,
      password: password
    }
  };
  // send user data to authenticate, return token if valid
  return await context.CustomClient.graphQLClient.send(mutation, data).then(({model}) => {
    return model;
  });
}
