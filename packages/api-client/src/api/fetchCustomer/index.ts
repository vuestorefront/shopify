export default function fetchCustomer(context, params) {
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
    .then(({ model }) => {
      if (model) {
        return model;
      }
    });
}
