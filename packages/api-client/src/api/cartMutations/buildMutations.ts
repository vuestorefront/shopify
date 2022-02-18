const cartMutation: (context) => any = (context): any => {

  const input = context.client.graphQLClient.variable('input', 'CartInput!');

  return context.client.graphQLClient.mutation('cartCreate', [input], (root) => {
    root.add('cartCreate', {args: {input}}, (cartObj) => {
      cartObj.add('cart', (cartInfo) => {
        cartInfo.add('id');
        cartInfo.add('checkoutUrl');
      });
      cartObj.add('userErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

export {
  cartMutation
};
