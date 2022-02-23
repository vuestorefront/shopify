export default function fetchOrders(context, params) {
  const getCustomerOrders = context.client.graphQLClient.query(
    (root) => {
      root.add(
        'customer',
        { args: { customerAccessToken: params } },
        (customerOrder) => {
          customerOrder.addConnection(
            'orders',
            { args: { first: 20 } },
            (order) => {
              order.add('id');
              order.add('name');
              order.add('orderNumber');
              order.add('processedAt');
              order.add('financialStatus');
              order.add('fulfillmentStatus');
              order.addField('currentTotalPrice', {}, (curTotPrice) => {
                curTotPrice.add('amount');
                curTotPrice.add('currencyCode');
              });
              order.addField('originalTotalPrice', {}, (originalTotalPrice) => {
                originalTotalPrice.add('amount');
                originalTotalPrice.add('currencyCode');
              });
              order.addField('originalTotalDuties', {}, (originalTotalDuties) => {
                originalTotalDuties.add('amount');
                originalTotalDuties.add('currencyCode');
              });
              order.addField('currentTotalTax', {}, (curTotTax) => {
                curTotTax.add('amount');
                curTotTax.add('currencyCode');
              });
              order.addField('currentSubtotalPrice', {}, (curSubTotPrice) => {
                curSubTotPrice.add('amount');
                curSubTotPrice.add('currencyCode');
              });
              order.addConnection('lineItems', { args: {first: 250} }, (Lineitem) => {
                Lineitem.add('title');
                Lineitem.add('quantity');
                Lineitem.addField('originalTotalPrice', {}, (originaldPrice)=>{
                  originaldPrice.add('amount');
                  originaldPrice.add('currencyCode');
                });
                Lineitem.addField('variant', {}, (variant) => {
                  variant.add('sku');
                  variant.addField('product', {}, (parentProduct) => {
                    parentProduct.add('id');
                    parentProduct.add('handle');
                  });
                  variant.addField('image', {}, (parentProduct) => {
                    parentProduct.add('altText');
                    parentProduct.add('originalSrc');
                  });
                });
              });
              order.addField('successfulFulfillments', {}, (trackingInfo) => {
                trackingInfo.addField('trackingInfo', {}, (tracking) => {
                  tracking.add('number');
                  tracking.add('url');
                });
              });
              order.addField('shippingAddress', {}, (saddress) => {
                saddress.add('name');
                saddress.add('phone');
                saddress.add('formatted');
              });
              order.addField('totalShippingPriceV2', {}, (TotalShippingPrice)=>{
                TotalShippingPrice.add('amount');
                TotalShippingPrice.add('currencyCode');
              });
            }
          );
        }
      );
    }
  );
  return context.client.graphQLClient
    .send(getCustomerOrders)
    .then(({ model }) => {
      if (model) {
        return model;
      }
    });
}
