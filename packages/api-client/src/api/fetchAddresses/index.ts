/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { addressesQuery as query } from './../customerMutations/buildQueries';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function fetchAddresses(context, params, customQuery?: CustomQuery) {
// send user data to authenticate, return token if valid
  const addresses = await context.CustomClient.graphQLClient.send(query(10, params)).then(({model}) => {
    if (model) {
      return model.customer;
    }
  });
  return addresses;
}
