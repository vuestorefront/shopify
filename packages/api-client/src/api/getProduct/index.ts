/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getProduct(
  context,
  params,
  customQuery?: CustomQuery
) {
  if (params.slug) {
    let chosenVariant = [];
    if (params.selectedOptions && Object.keys(params.selectedOptions).length > 0) {
      chosenVariant = Object.entries(params.selectedOptions).map(k => ({ name: k[0], value: k[1] }));
    }
    const getProductByHandleQuery = context.client.graphQLClient.query(
      (root) => {
        root.add(
          'productByHandle',
          { args: { handle: params.slug } },
          (productByHandle) => {
            // get product basic information
            productByHandle.add('id');
            productByHandle.add('title');
            productByHandle.add('description');
            productByHandle.add('descriptionHtml');
            productByHandle.add('handle');
            productByHandle.add('tags');
            productByHandle.add('availableForSale');
            productByHandle.add('totalInventory');
            productByHandle.add('vendor');
            productByHandle.addField('seo', (seoData) => {
                seoData.add('title');
                seoData.add('description');
            });
            productByHandle.addConnection(
              'metafields',
              { args: { first: 20 } },
              (metafields) => {
                metafields.add('id');
                metafields.add('createdAt');
                metafields.add('updatedAt');
                metafields.add('namespace');
                metafields.add('type');
                metafields.add('key');
                metafields.add('value');
              }
            );
            productByHandle.add('variantBySelectedOptions', { args: { selectedOptions: chosenVariant } }, (selectedVariant) => {
              selectedVariant.add('id');
              selectedVariant.add('title');
              selectedVariant.add('sku');
              selectedVariant.add('availableForSale');
              selectedVariant.add('quantityAvailable');
              selectedVariant.addField('image', { args: {} }, (image) => {
                image.add('altText');
                image.add('originalSrc');
                image.add('transformedSrc');
              });
              selectedVariant.addField('priceV2', (price) => {
                price.add('amount');
                price.add('currencyCode');
              });
              selectedVariant.addField('compareAtPriceV2', (price) => {
                price.add('amount');
                price.add('currencyCode');
              });
            });
            productByHandle.add('options', {}, (options) => {
              options.add('name');
              options.add('values');
            });
            productByHandle.addConnection(
              'collections',
              { args: { first: 20 } },
              (collection) => {
                collection.add('title');
                collection.add('handle');
              }
            );
            productByHandle.addConnection(
              'images',
              { args: { first: 20 } },
              (image) => {
                image.add('id');
                image.add('altText');
                image.add('originalSrc');
                image.add('transformedSrc');
              }
            );

            productByHandle.addConnection(
              'variants',
              { args: { first: 1 } },
              (variants) => {
                variants.add('title');
                variants.add('price');
                variants.add('weight');
                variants.add('availableForSale');
                variants.add('sku');
                variants.add('compareAtPrice');

                variants.addField('image', { args: {} }, (image) => {
                  image.add('id');
                  image.add('altText');
                  image.add('originalSrc');
                  image.add('transformedSrc');
                });

                variants.addField('selectedOptions', {}, (selectedOptions) => {
                  selectedOptions.add('name');
                  selectedOptions.add('value');
                });

                variants.addField('product', {}, (product) => {
                  product.add('id');
                  product.add('title');
                  product.add('availableForSale');
                  product.add('handle');
                  product.add('description');
                  product.add('descriptionHtml');
                  product.addConnection(
                    'images',
                    { args: { first: 20 } },
                    (images) => {
                      images.add('id');
                      images.add('altText');
                      images.add('originalSrc');
                      images.add('transformedSrc');
                    }
                  );
                  product.add('productType');
                  product.addField('options', {}, (options) => {
                    options.add('name');
                    options.add('values');
                  });
                });
              }
            );
          }
        );
      }
    );
    return context.client.graphQLClient
      .send(getProductByHandleQuery)
      .then(({ model, product }) => {
        if (model) {
          return model.productByHandle;
        }
      });
  } else if (params.related) {
    const getrelatedProductsByIdQuery = context.client.graphQLClient.query(
      (root) => {
        root.add(
          'productRecommendations',
          { args: { productId: params.productId } },
          (relatedProductsById) => {
            // get product basic information
            relatedProductsById.add('id');
            relatedProductsById.add('title');
            relatedProductsById.add('handle');
            relatedProductsById.add('options', {}, (options) => {
              options.add('name');
              options.add('values');
            });
            relatedProductsById.addConnection(
              'images',
              { args: { first: 20 } },
              (image) => {
                image.add('id');
                image.add('altText');
                image.add('originalSrc');
                image.add('transformedSrc');
              }
            );
            relatedProductsById.addConnection(
              'collections',
              { args: { first: 20 } },
              (collection) => {
                collection.add('title');
                collection.add('handle');
              }
            );
            relatedProductsById.addConnection(
              'variants',
              { args: { first: 20 } },
              (variants) => {
                variants.add('title');
                variants.add('price');
                variants.add('weight');
                variants.add('availableForSale');
                variants.add('sku');
                variants.add('compareAtPrice');

                variants.addField('image', { args: {} }, (image) => {
                  image.add('id');
                  image.add('altText');
                  image.add('originalSrc');
                  image.add('transformedSrc');
                });

                variants.addField('selectedOptions', {}, (selectedOptions) => {
                  selectedOptions.add('name');
                  selectedOptions.add('value');
                });

                variants.addField('product', {}, (product) => {
                  product.add('id');
                  product.add('title');
                  product.add('availableForSale');
                  product.add('handle');
                  product.add('description');
                  product.add('descriptionHtml');
                  product.addConnection(
                    'images',
                    { args: { first: 20 } },
                    (images) => {
                      images.add('id');
                      images.add('altText');
                      images.add('originalSrc');
                      images.add('transformedSrc');
                    }
                  );
                  product.add('productType');
                  product.addField('options', {}, (options) => {
                    options.add('name');
                    options.add('values');
                  });
                });
              }
            );
          }
        );
      }
    );
    return context.client.graphQLClient
      .send(getrelatedProductsByIdQuery)
      .then(({ model }) => {
        if (model) {
          return model.productRecommendations;
        }
      });
  } else if (params.id) {
    return await context.client.product.fetch(params.id).then((product) => {
      return product;
    });
  } else if (params.ids){
    return await context.client.product.fetchMultiple(params.ids).then((products) => {
      return products;
    });
  } else {
    return await context.client.product
      .fetchQuery({ first: (params.limit ? params.limit : 20), sortKey: (params.sortBy ? params.sortBy : 'CREATED_AT'), reverse: false })
      .then((products) => {
        return products;
      });
  }
}
