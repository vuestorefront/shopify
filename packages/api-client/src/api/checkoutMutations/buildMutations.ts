const checkoutMutation: (context) => any = (context): any => {

  const input = context.client.graphQLClient.variable('input', 'CheckoutCreateInput!');

  return context.client.graphQLClient.mutation('checkoutCreate', [input], (root) => {
    root.add('checkoutCreate', {args: {input}}, (checkoutObj) => {
      checkoutObj.add('checkout', (checkoutInfo) => {
        checkoutInfo.add('id');
        checkoutInfo.add('webUrl');
      });
      checkoutObj.add('checkoutUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

export {
  checkoutMutation
};
