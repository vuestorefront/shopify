/* TODO: Fetch custom client directly, may be using context  */
const changePasswordMutation: (context) => any = (context): any => {
  const customerAccessToken = context.client.graphQLClient.variable('customerAccessToken', 'String!');
  const customer = context.client.graphQLClient.variable('customer', 'CustomerUpdateInput!');

  return context.client.graphQLClient.mutation('customerUpdate', [customerAccessToken, customer], (root) => {
    root.add('customerUpdate', {args: {customerAccessToken, customer}}, (customer) => {
      customer.add('customer', (fields) => {
        fields.add('id');
        fields.add('displayName');
        fields.add('email');
        fields.add('firstName');
        fields.add('lastName');
        fields.add('phone');
      });
      customer.add('customerAccessToken', (token) => {
        token.add('accessToken');
        token.add('expiresAt');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const forgotPasswordMutation: (context) => any = (context): any => {

  const email = context.client.graphQLClient.variable('email', 'String!');

  return context.client.graphQLClient.mutation('customerRecover', [email], (root) => {
    root.add('customerRecover', {args: {email}}, (customer) => {
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const editProfileMutation: (context) => any = (context): any => {
  const customerAccessToken = context.client.graphQLClient.variable('customerAccessToken', 'String!');
  const customer = context.client.graphQLClient.variable('customer', 'CustomerUpdateInput!');

  return context.client.graphQLClient.mutation('customerUpdate', [customerAccessToken, customer], (root) => {
    root.add('customerUpdate', {args: {customerAccessToken, customer}}, (customer) => {
      customer.add('customer', (fields) => {
        fields.add('id');
        fields.add('displayName');
        fields.add('email');
        fields.add('firstName');
        fields.add('lastName');
        fields.add('phone');
      });
      customer.add('customerAccessToken', (token) => {
        token.add('accessToken');
        token.add('expiresAt');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const signInMutation: (context) => any = (context): any => {
  const input = context.client.graphQLClient.variable('input', 'CustomerAccessTokenCreateInput!');

  return context.client.graphQLClient.mutation('customerAccessTokenCreate', [input], (root) => {
    root.add('customerAccessTokenCreate', {args: {input}}, (customer) => {
      customer.add('customerAccessToken', (token) => {
        token.add('accessToken');
        token.add('expiresAt');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const signOutMutation: (context) => any = (context): any => {

  const customerAccessToken = context.client.graphQLClient.variable('customerAccessToken', 'String!');

  return context.client.graphQLClient.mutation('customerAccessTokenDelete', [customerAccessToken], (root) => {
    root.add('customerAccessTokenDelete', {args: {customerAccessToken}}, (customer) => {
      customer.add('deletedAccessToken');
      customer.add('deletedCustomerAccessTokenId');
      customer.add('userErrors', (error) => {
        error.add('field');
        error.add('message');
      });
    });
  });
};

const signUpMutation: (context) => any = (context): any => {

  const input = context.client.graphQLClient.variable('input', 'CustomerCreateInput!');

  return context.client.graphQLClient.mutation('customerCreate', [input], (root) => {
    root.add('customerCreate', {args: {input}}, (customer) => {
      customer.add('customer', (token) => {
        token.add('id');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

export {
  changePasswordMutation,
  forgotPasswordMutation,
  editProfileMutation,
  signInMutation,
  signOutMutation,
  signUpMutation
};
