import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core';

export async function fetchCustomer(context, params, customQuery?: CustomQuery) {
  const DEFAULT_QUERY = `query customer($customerAccessToken: String!){
    customer(customerAccessToken: $customerAccessToken){
      id
      displayName
      email
      firstName
      lastName
      phone
      tags
      acceptsMarketing
	}
}`;
  
  // Retrieve token
  const payload = {
      customerAccessToken: params
  };
  
  const { customer } = context.extendQuery(
      customQuery,
      {
        customer: {
          query: DEFAULT_QUERY as any,
          variables: payload
        }
      }
  )
  // send user data to authenticate, return token if valid
  return await context.client.apolloClient.query({
    query: gql(customer.query) as any,
    variables: customer.variables
  }).then((result) => {
    return result.data;
  });
}
