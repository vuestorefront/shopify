/* eslint-disable func-names */
/* TODO: Fetch custom client directly, may be using context  */
const Customclient = require('shopify-buy/index.unoptimized.umd.js');
const CustomClient = Customclient.buildClient({
  domain: 'YOUR SHOPIFY STORE DOMAIN',
  storefrontAccessToken: 'YOUR STORE ACCESS TOKEN'
});

const customerQuery: (token: string) => any = (token): any => {

  return CustomClient.graphQLClient.query((root) => {
    root.add('customer', {
      args: {
        customerAccessToken: token
      }
    }, (customer) => {
      customer.add('id');
      customer.add('displayName');
      customer.add('email');
      customer.add('firstName');
      customer.add('lastName');
      customer.add('phone');
      customer.add('lastIncompleteCheckout', function (lcheckout) {
        lcheckout.add('id');
      });
    });
  });
};

const ordersQuery: (pages: number, token: string) => any = (pages, token): any => {

  return CustomClient.graphQLClient.query((root) => {
    root.add('customer', {
      args: {
        customerAccessToken: token
      }
    }, (customer) => {
      customer.add('id');
      customer.addConnection('orders', {args: {first: pages}}, (order) => {
        order.add('name');
        order.add('orderNumber');
        order.add('processedAt');
        order.add('financialStatus');
        order.add('fulfillmentStatus');
        order.add('currentTotalPrice', function (price) {
          price.add('amount');
          price.add('currencyCode');
        });
        order.add('currentTotalTax', function (tax) {
          tax.add('amount');
          tax.add('currencyCode');
        });
        order.add('currentSubtotalPrice', function (subtotal) {
          subtotal.add('amount');
          subtotal.add('currencyCode');
        });
        order.addConnection('lineItems', {args: {first: 100}}, function (item) {
          item.add('title');
          item.add('quantity');
          item.add('currentQuantity');
          item.add('originalTotalPrice', function (price) {
            price.add('amount');
            price.add('currencyCode');
          });
          item.add('variant', function (price) {
            price.add('sku');
            price.add('title');
            price.add('product', function (handle) {
              handle.add('handle');
            });

          });
        });
      });
    });
  });
};

const addressesQuery: (pages: number, token: string) => any = (pages, token): any => {

  return CustomClient.graphQLClient.query((root) => {
    root.add('customer', {
      args: {
        customerAccessToken: token
      }
    }, (customer) => {
      customer.add('id');
      customer.addConnection('addresses', {args: {first: 10}}, function (address) {
        address.add('address1');
        address.add('address2');
        address.add('city');
        address.add('company');
        address.add('firstName');
        address.add('lastName');
        address.add('name');
        address.add('phone');
        address.add('province');
        address.add('provinceCode');
        address.add('zip');
        address.add('formattedArea');
      });
    });
  });
};

export {
  customerQuery,
  ordersQuery,
  addressesQuery
};
