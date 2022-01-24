/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { checkoutMutation as mutation } from './../checkoutMutations/buildMutations';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function createCart(context, _params, _customQuery?: CustomQuery) {
  const data = {
    "input": {
      buyerIdentity: {
        countryCode: (context.res.req.cookies['vsf-locale'] === "en") ? "US" : (context.res.req.cookies['vsf-locale']).toUpperCase()
      }
    }
  }
  // initiate the cart
  return await context.client.graphQLClient.send(mutation(context), data).then(({ data }) => {
    if (data) {
      return data.checkoutCreate.checkout.id;
    }
  });
  
  // return await context.client.checkout.create().then((checkout) => {
  //   // return checkOut ID
  //   return checkout.id;
  // });
}
