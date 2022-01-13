/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core'
import { print } from 'graphql'
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

    const DEFAULT_QUERY = gql`
    query @inContext(country: DE ) {
      productByHandle(handle: "blouse"){
        id
        title
        description
        descriptionHtml
        handle
        tags
        availableForSale
        totalInventory
        vendor
        seo{
          title
          description
        }
        variantBySelectedOptions(selectedOptions:[]){
          id
          title
          sku
          availableForSale
          quantityAvailable
          image{
            altText
            originalSrc
            transformedSrc
          }
          priceV2{
            currencyCode
            amount
          }
          compareAtPriceV2{
            currencyCode
            amount
          }
        }
        options{
          name
          values
        }
        collections(first:250){
          edges{
            node{
              title
              handle
            }
          }
        }
        images(first:20){
          edges{
            node{
              id
              altText
              originalSrc
              transformedSrc
            }
          }
        }
        variants(first:20){
          edges{
            node{
              title
              weight
              availableForSale
              sku
              priceV2{
                amount
                currencyCode
              }
              compareAtPriceV2{
                amount
                currencyCode
              }
              image{
                id
                altText
                originalSrc
                transformedSrc
              }
              selectedOptions{
                name
                value
              }
              product{
                id
                title
                availableForSale
                handle
                description
                descriptionHtml
                images(first:20){
                  edges{
                    node{
                      id
                      altText
                      originalSrc
                      transformedSrc
                    }
                  }
                }
                productType
                options{
                  name
                  values
                }
              }
            }
          }
        }
      }
    }`
    const payload = {
      handle: params.slug
    }

    const { productByHandle } = context.extendQuery(
      customQuery,
      {
        productByHandle: {
          query: print(DEFAULT_QUERY as any),
          payload
        }
      }
    )


    return await context.client.apolloClient.query({
      query: gql(productByHandle.query) as any,
      variables: productByHandle.payload
    }).then((result) => {
      const collections = result.data.productByHandle.collections.edges.map((collection => collection.node));
      const images = result.data.productByHandle.images.edges.map((image => image.node));
      const variants = result.data.productByHandle.variants.edges.map((variant => variant.node));
      delete(result.data.productByHandle.collections);
      delete(result.data.productByHandle.images);
      delete(result.data.productByHandle.variants);
      result.data.productByHandle = {
        ...result.data.productByHandle,
        collections,
        images,
        variants
      };
      return result.data.productByHandle;
    });


    // const getProductByHandleQuery = context.client.graphQLClient.query(
    //   (root) => {
    //     root.add(
    //       'productByHandle',
    //       { args: { handle: params.slug } },
    //       (productByHandle) => {
    //         // get product basic information
    //         productByHandle.add('id');
    //         productByHandle.add('title');
    //         productByHandle.add('description');
    //         productByHandle.add('descriptionHtml');
    //         productByHandle.add('handle');
    //         productByHandle.add('tags');
    //         productByHandle.add('availableForSale');
    //         productByHandle.add('totalInventory');
    //         productByHandle.add('vendor');
    //         productByHandle.addField('seo', (seoData) => {
    //             seoData.add('title');
    //             seoData.add('description');
    //         });
    //         productByHandle.add('variantBySelectedOptions', { args: { selectedOptions: chosenVariant } }, (selectedVariant) => {
    //           selectedVariant.add('id');
    //           selectedVariant.add('title');
    //           selectedVariant.add('sku');
    //           selectedVariant.add('availableForSale');
    //           selectedVariant.add('quantityAvailable');
    //           selectedVariant.addField('image', { args: {} }, (image) => {
    //             image.add('altText');
    //             image.add('originalSrc');
    //             image.add('transformedSrc');
    //           });
    //           selectedVariant.addField('priceV2', (price) => {
    //             price.add('amount');
    //             price.add('currencyCode');
    //           });
    //           selectedVariant.addField('compareAtPriceV2', (price) => {
    //             price.add('amount');
    //             price.add('currencyCode');
    //           });
    //         });
    //         productByHandle.add('options', {}, (options) => {
    //           options.add('name');
    //           options.add('values');
    //         });
    //         productByHandle.addConnection(
    //           'collections',
    //           { args: { first: 20 } },
    //           (collection) => {
    //             collection.add('title');
    //             collection.add('handle');
    //           }
    //         );
    //         productByHandle.addConnection(
    //           'images',
    //           { args: { first: 20 } },
    //           (image) => {
    //             image.add('id');
    //             image.add('altText');
    //             image.add('originalSrc');
    //             image.add('transformedSrc');
    //           }
    //         );

    //         productByHandle.addConnection(
    //           'variants',
    //           { args: { first: 1 } },
    //           (variants) => {
    //             variants.add('title');
    //             variants.add('weight');
    //             variants.add('availableForSale');
    //             variants.add('sku');
    //             variants.addField('priceV2', (price) => {
    //               price.add('amount');
    //               price.add('currencyCode');
    //             });
    //             variants.addField('compareAtPriceV2', (price) => {
    //               price.add('amount');
    //               price.add('currencyCode');
    //             });

    //             variants.addField('image', { args: {} }, (image) => {
    //               image.add('id');
    //               image.add('altText');
    //               image.add('originalSrc');
    //               image.add('transformedSrc');
    //             });

    //             variants.addField('selectedOptions', {}, (selectedOptions) => {
    //               selectedOptions.add('name');
    //               selectedOptions.add('value');
    //             });

    //             variants.addField('product', {}, (product) => {
    //               product.add('id');
    //               product.add('title');
    //               product.add('availableForSale');
    //               product.add('handle');
    //               product.add('description');
    //               product.add('descriptionHtml');
    //               product.addConnection(
    //                 'images',
    //                 { args: { first: 20 } },
    //                 (images) => {
    //                   images.add('id');
    //                   images.add('altText');
    //                   images.add('originalSrc');
    //                   images.add('transformedSrc');
    //                 }
    //               );
    //               product.add('productType');
    //               product.addField('options', {}, (options) => {
    //                 options.add('name');
    //                 options.add('values');
    //               });
    //             });
    //           }
    //         );
    //       }
    //     );
    //   }
    // );
    // return context.client.graphQLClient
    //   .send(getProductByHandleQuery)
    //   .then(({ model, product }) => {
    //     if (model) {
    //       console.log('model.productByHandle::', typeof model.productByHandle, model.productByHandle);
    //       return model.productByHandle;
    //     }
    //   });
  } else if (params.related) {

    // let chosenVariant = [];
    // if (params.selectedOptions && Object.keys(params.selectedOptions).length > 0) {
    //   chosenVariant = Object.entries(params.selectedOptions).map(k => ({ name: k[0], value: k[1] }));
    // }

    // const DEFAULT_QUERY = gql`
    // query @inContext(country: DE){
    //   productRecommendations(productId:"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzUzMjc1NTA2MTE2MTY="){
    //     id
    //     title
    //     handle
    //     options{
    //       name
    //       values
    //     }
    //     collections(first:250){
    //       edges{
    //         node{
    //           title
    //           handle
    //         }
    //       }
    //     }
    //     images(first:20){
    //       edges{
    //         node{
    //           id
    //           altText
    //           originalSrc
    //           transformedSrc
    //         }
    //       }
    //     }
    //     variants(first:20){
    //       edges{
    //         node{
    //           title
    //           weight
    //           availableForSale
    //           sku
    //           priceV2{
    //             amount
    //             currencyCode
    //           }
    //           compareAtPriceV2{
    //             amount
    //             currencyCode
    //           }
    //           image{
    //             id
    //             altText
    //             originalSrc
    //             transformedSrc
    //           }
    //           selectedOptions{
    //             name
    //             value
    //           }
    //           product{
    //             id
    //             title
    //             availableForSale
    //             handle
    //             description
    //             descriptionHtml
    //             images(first:20){
    //               edges{
    //                 node{
    //                   id
    //                   altText
    //                   originalSrc
    //                   transformedSrc
    //                 }
    //               }
    //             }
    //             productType
    //             options{
    //               name
    //               values
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }`
    // const payload = {
    //   productId: params.id
    // }

    // const { productRecommendations } = context.extendQuery(
    //   customQuery,
    //   {
    //     productRecommendations: {
    //       query: print(DEFAULT_QUERY as any),
    //       payload
    //     }
    //   }
    // )


    // return await context.client.apolloClient.query({
    //   query: gql(productRecommendations.query) as any,
    //   variables: productRecommendations.payload
    // }).then((result) => {
    //   const collections = result.data.productRecommendations.collections.edges.map((collection => collection.node));
    //   const images = result.data.productRecommendations.images.edges.map((image => image.node));
    //   const variants = result.data.productRecommendations.variants.edges.map((variant => variant.node));
    //   delete(result.data.productRecommendations.collections);
    //   delete(result.data.productRecommendations.images);
    //   delete(result.data.productRecommendations.variants);
    //   result.data.productRecommendations = {
    //     ...result.data.productRecommendations,
    //     collections,
    //     images,
    //     variants
    //   };
    //   return result.data.productRecommendations;
    // });

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
                // variants.add('price');
                variants.add('weight');
                variants.add('availableForSale');
                variants.add('sku');
                // variants.add('compareAtPrice');

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

                variants.addField('priceV2', {}, (priceV2) => {
                  priceV2.add('currencyCode');
                  priceV2.add('amount');
                });

                variants.addField('compareAtPriceV2', {}, (compareAtPriceV2) => {
                  compareAtPriceV2.add('currencyCode');
                  compareAtPriceV2.add('amount');
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
    const curLocaleCode = params.curLocaleCode;
    // console.log('context::', context.client, context.client.res.cookies);
    const DEFAULT_QUERY = gql`
    query products @inContext(country: DE ) {
      products(first:20, sortKey:CREATED_AT, reverse: false){
        edges{
          node{
            id
            availableForSale
            createdAt
            updatedAt
            description
            descriptionHtml
            handle
            title
            productType
            vendor
            publishedAt
            onlineStoreUrl
            options{
              name
              values
            }
            images(first:20){
              edges{
                node{
                  altText
                  id
                  originalSrc
                  src
                }
              }
            }
            variants(first:250){
              edges{
                node{
                  availableForSale
                  priceV2{
                    currencyCode
                    amount
                  }
                  compareAtPriceV2{
                    amount
                    currencyCode
                  }
                  id
                  image{
                    id
                    altText
                    originalSrc
                    src
                  }
                }
              }
            }
            priceRange{
              minVariantPrice{
                currencyCode
                amount
              }
              maxVariantPrice{
                currencyCode
                amount
              }
            }
            images(first:20){
              edges{
                node{
                  id
                  originalSrc
                  altText
                }
              }
            }
            
          }
        }
      } 
    }`
    const payload = {
      first: (params.limit ? params.limit : 20),
      sortKey: (params.sortBy ? params.sortBy : 'CREATED_AT'),
      reverse: false
    }

    const { products } = context.extendQuery(
      customQuery,
      {
        products: {
          query: print(DEFAULT_QUERY as any),
          payload
        }
      }
    )


    return await context.client.apolloClient.query({
      query: gql(products.query) as any,
      variables: products.payload
    }).then((result) => {
      const items = result.data.products.edges.map(item => {
      const product = {
        ...item.node,
        images: item.node.images.edges.map(image => image.node) as any,
        variants: item.node.variants.edges.map(variant => variant.node) as any
      }
        return product
      })
      return items;
    });
    
    // console.log('products123::', productsRes);
    // return await context.client.product
    //   .fetchQuery({ first: (params.limit ? params.limit : 20), sortKey: (params.sortBy ? params.sortBy : 'CREATED_AT'), reverse: false })
    //   .then((products) => {
    //     console.log('products234::', products);
    //     return products;
    //   });
  }
}
