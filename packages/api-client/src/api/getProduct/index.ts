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
    const DEFAULT_QUERY = `
    query product($handle: String!, $country: CountryCode!, $selectedOptions: [SelectedOptionInput!]! ) @inContext(country: $country ) {
      productByHandle(handle: $handle){
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
        variantBySelectedOptions(selectedOptions:$selectedOptions){
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
          id
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
              id
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
                  id
                  name
                  values
                }
              }
            }
          }
        }
      }
    }`
    const variables = {
      handle: params.slug,
      country: (context.res.req.cookies['vsf-locale'] === "en") ? "US" : (context.res.req.cookies['vsf-locale']).toUpperCase(),
      selectedOptions: chosenVariant
    }

    const { productByHandle } = context.extendQuery(
      customQuery,
      {
        productByHandle: {
          query: DEFAULT_QUERY as any,
          variables
        }
      }
    )


    return await context.client.apolloClient.query({
      query: gql(productByHandle.query) as any,
      variables: productByHandle.variables
    }).then((result) => {
      const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: item,
          };
        }, initialValue);
      };
      const collections = result.data.productByHandle.collections.edges.map((collection => collection.node));
      const images = result.data.productByHandle.images.edges.map((image => image.node));
      const variants = result.data.productByHandle.variants.edges.map((variant => variant.node));

      const newResult = {
        ...result,
        data: {
          ...result.data,
          productByHandle: {
            ...result.data.productByHandle,
            collections,
            images,
            variants
          }
        }
      }
      return newResult.data.productByHandle;
    }).catch(console.log);
  }
  else if (params.related) {

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
                variants.add('weight');
                variants.add('availableForSale');
                variants.add('sku');

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
  } else if (params.ids) {
    return await context.client.product.fetchMultiple(params.ids).then((products) => {
      return products;
    });
  } else {
    const DEFAULT_QUERY = gql`
    query GET_PRODUCTS($country: CountryCode!, $first: Int!, $sortKey:  ProductSortKeys!, $reverse: Boolean!) @inContext(country: $country){
      products(first:$first, sortKey: $sortKey, reverse: $reverse) {
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
              id
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
                  sku
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
                  selectedOptions{
                    name
                    value
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
      reverse: false,
      country: (context.res.req.cookies['vsf-locale'] === "en") ? "US" : (context.res.req.cookies['vsf-locale']).toUpperCase()
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
  }
}
