import { CustomQuery } from '@vue-storefront/core';
import { gql } from '@apollo/client/core'
import { getCountry } from '../../helpers/utils';
export async function getProduct(
  context,
  params,
  customQuery?: CustomQuery
) {
  const localeInfo = params.localeInfo;
  if (params.slug) {
    let chosenVariant = [];
    if (params.selectedOptions && Object.keys(params.selectedOptions).length > 0) {
      chosenVariant = Object.entries(params.selectedOptions).map(k => ({ name: k[0], value: k[1] }));
    }
    const DEFAULT_QUERY = `query product($handle: String!, $country: CountryCode!, $selectedOptions: [SelectedOptionInput!]! ) @inContext(country: $country ) {
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
      country: getCountry(context, true, localeInfo.default, localeInfo.cur),
      selectedOptions: chosenVariant
    }

    const { productByHandle } = context.extendQuery(
      customQuery,
      {
        productByHandle: {
          query: DEFAULT_QUERY,
          variables
        }
      }
    )


    return await context.client.apolloClient.query({
      query: gql(productByHandle.query) as any,
      variables: productByHandle.variables
    }).then((result) => {
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
    }).catch();
  }
  else if (params.related) {
    const DEFAULT_QUERY = `query GET_PRODUCT_RECOMMENDATION($productId: ID!, $country: CountryCode!) @inContext(country: $country){
      productRecommendations(productId:$productId){
        id
        title
        handle
        options{
          name
          values
        }
        totalInventory
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
    const localeInfo = params.localeInfo;
    const payload = {
      productId: params.productId,
      country: getCountry(context, true, localeInfo.default, localeInfo.cur),
    }

    const { productRecommendations } = context.extendQuery(
      customQuery,
      {
        productRecommendations: {
          query: DEFAULT_QUERY,
          payload
        }
      }
    )

    return await context.client.apolloClient.query({
      query: gql(productRecommendations.query) as any,
      variables: productRecommendations.payload
    }).then((result) => {
      if (result.data.productRecommendations && result.data.productRecommendations.length > 0) {
        const productRecommendations = []; 
        for (let pr = 0; pr < result.data.productRecommendations.length; pr++) {
          const collections = result.data.productRecommendations[pr].collections.edges.map((collection => collection.node));
          const images = result.data.productRecommendations[pr].images.edges.map((image => image.node));
          const variants = result.data.productRecommendations[pr].variants.edges.map((variant => variant.node));
          delete (result.data.productRecommendations[pr].collections);
          delete (result.data.productRecommendations[pr].images);
          delete (result.data.productRecommendations[pr].variants);
          productRecommendations.push({
            ...result.data.productRecommendations[pr],
            collections,
            images,
            variants
          });
        }
        return productRecommendations;
      }
      return result.data.productRecommendations;
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
    const DEFAULT_QUERY = `query GET_PRODUCTS($country: CountryCode!, $first: Int!, $sortKey:  ProductSortKeys!, $reverse: Boolean!) @inContext(country: $country){
      products(first:$first, sortKey: $sortKey, reverse: $reverse) {
        edges{
          node{
            id
            availableForSale
            createdAt
            updatedAt
            description
            totalInventory
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
      country: getCountry(context, true, localeInfo.default, localeInfo.cur)
    }
    const { products } = context.extendQuery(
      customQuery,
      {
        products: {
          query: DEFAULT_QUERY,
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
