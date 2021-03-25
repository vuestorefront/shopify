/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { ProductVariant } from '@vue-storefront/shopify-api/src/types';
import { enhanceProduct, enhanceProductVariation } from '../helpers/internals';
import { formatAttributeList, getVariantByAttributes } from './_utils';

type ProductVariantFilters = any

// TODO: Add interfaces for some of the methods in core
// Product

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: ProductVariant): string => product?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductSlug = (product: ProductVariant): string => {
  return product._slug;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: ProductVariant): AgnosticPrice => {
  return {
    regular: product?.price?.original || 0,
    special: product?.price?.current || 0
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: ProductVariant): AgnosticMediaGalleryItem[] =>
  (product ? product.images : [])
    .map((image) => ({
      small: image.originalSrc,
      big: image.originalSrc,
      normal: image.originalSrc
    }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getProductCoverImage = product => {
  return product?._coverImage?.src || '';
};
export const getActiveVariantImage = (product) => {
  for (let i = 1; i < (product.images).length; i++) {
    if (product.images[i].originalSrc === product._coverImage.originalSrc) {
      return i;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products, filters: ProductVariantFilters | any = {}) => {
  if (!products) {
    return [];
  }
  // convert entire product response to productvariant interface
  if (filters.attributes && Object.keys(filters.attributes).length > 0) {
    let selectedVariant = getVariantByAttributes(products, filters.attributes);
    if (!selectedVariant) {
      selectedVariant = products.variants[0];
    }
    const selectedVariantArr = Array.isArray(selectedVariant) ? selectedVariant : [selectedVariant];
    return enhanceProductVariation(selectedVariantArr);
  }
  if (filters.master) {
    products = Array.isArray(products) ? products : [products];
  }

  return enhanceProduct(products);

};
export const getSelectedVariant = (product: ProductVariant, attribs) => {
  return attribs;
};
export const getProductOptions = (product: ProductVariant): Record<string, AgnosticAttribute | string> => {
  const productOptions = (product as any).options;
  return productOptions;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: ProductVariant, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  const isSingleProduct = !Array.isArray(products);
  const productList = (isSingleProduct ? [products] : products) as ProductVariant[];
  if (!products || productList.length === 0) {
    return {} as any;
  }

  /* const formatAttributes = (products): AgnosticAttribute[] =>{
    return formatAttributeList(products.options);
  };*/
  const formatAttributes = (product: ProductVariant): AgnosticAttribute[] =>
    formatAttributeList(product.options).filter((attribute) => filterByAttributeName ? filterByAttributeName.includes(attribute.name) : attribute);

  const reduceToUniques = (prev, curr) => {
    const isAttributeExist = prev.some((el) => el.name === curr.name && el.value === curr.value);

    if (!isAttributeExist) {
      return [...prev, curr];
    }

    return prev;
  };

  const reduceByAttributeName = (prev, curr) => ({
    ...prev,
    [curr.name]: isSingleProduct ? curr.value : [
      ...(prev[curr.name] || []),
      {
        value: curr.value,
        label: curr.label
      }
    ]
  });
  return productList
    .map((product) => formatAttributes(product))
    .reduce((prev, curr) => [...prev, ...curr], [])
    .reduce(reduceToUniques, [])
    .reduce(reduceByAttributeName, {});
};

export const getProductDescription = (product: ProductVariant, isWantHtml?: boolean): any => {
  if (product) {
    if (isWantHtml) {
      return product._descriptionHtml;
    }
    return product._description;
  }
};

export const getProductCategoryIds = (product: ProductVariant): string[] => (product as any)?._categoriesRef || '';

export const getProductId = (product: ProductVariant): string => (product as any)?._id || '';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getFormattedPrice = (price: number) => String(price);

export const getProductStatus = (product: ProductVariant): boolean => {
  if (product && (product._availableForSale || product.available)) {
    return true;
  }
  return false;
};

export const checkForWishlist = (product: ProductVariant): boolean => (product as any).isOnWishlist ?? false;

export const getBreadcrumbs = (product: ProductVariant): any => {
  const breadCrumbs = [
    {
      text: 'Home',
      route: {
        link: '/'
      }
    }
  ];
  if (product && product.productType) {
    breadCrumbs.push({
      text: product.productType,
      route: {
        link: '#'
      }
    });
  }
  if (product && product.name) {
    breadCrumbs.push({
      text: getProductName(product),
      route: {
        link: '#'
      }
    });
  }
  return breadCrumbs;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductTotalReviews = (product: ProductVariant): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAverageRating = (product: ProductVariant): number => 0;

const productGetters: ProductGetters<ProductVariant, ProductVariantFilters> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getVariantImage: getActiveVariantImage,
  getFiltered: getProductFiltered,
  getOptions: getProductOptions,
  getAttributes: getProductAttributes,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getStatus: getProductStatus,
  getFormattedPrice: getFormattedPrice,
  getTotalReviews: getProductTotalReviews,
  getAverageRating: getProductAverageRating,
  getBreadcrumbs: getBreadcrumbs,
  getSelectedVariant
};

export default productGetters;
