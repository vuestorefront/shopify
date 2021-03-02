/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { signUpMutation as mutation } from './../customerMutations/buildMutations';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function signUp(context, params, customQuery?: CustomQuery) {
  const data = {
    input: params
  };

  // send userdata to register
  return await context.CustomClient.graphQLClient.send(mutation, data).then(({model}) => {
    return model;
  });
}
