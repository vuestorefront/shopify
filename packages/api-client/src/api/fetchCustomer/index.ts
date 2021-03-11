/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { customerQuery as query } from './../customerMutations/buildQueries';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function fetchCustomer(context, params, customQuery?: CustomQuery) {
  // send user data to authenticate, return token if valid
  return await context.CustomClient.graphQLClient.send(query(params, context)).then(({model}) => {
    return model;
  });
}
