/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { customerQuery as query } from './../customerMutations/buildQueries';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function fetchCustomer(context, params, customQuery?: CustomQuery) {
  const getCustomeInfo = context.client.graphQLClient.query(
    (root) => {
      root.add(
        'customer',
        { args: { customerAccessToken: params } },
        (customerInfo) => {
          customerInfo.add('id');
          customerInfo.add('displayName');
          customerInfo.add('email');
          customerInfo.add('firstName');
          customerInfo.add('lastName');
          customerInfo.add('phone');
          customerInfo.add('tags');
          customerInfo.add('acceptsMarketing');
        }
      );
    });
  // send user data to authenticate, return token if valid
  return context.client.graphQLClient
    .send(getCustomeInfo)
    .then(({ model, product }) => {
      if (model) {
        return model;
      }
    });
}
