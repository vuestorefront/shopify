/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { ProductVariant } from '@vue-storefront/shopify-api/src/types';
import { enhanceProduct } from '../helpers/internals';
import { formatAttributeList, capitalize } from './_utils';

type ProductVariantFilters = any

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: ProductVariant): string => product?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductSlug = (product: ProductVariant): string => {
  if (product) {
    return product._slug;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: ProductVariant): AgnosticPrice => {
  return {
    regular: product?.price?.original || 0,
    special: product?.price?.current || 0
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductDiscountPercentage = (product): number => {
  const regular = parseFloat(product?.price?.original) || 0;
  const special = parseFloat(product?.price?.current) || 0;
  if (special < regular) {
    const discount = regular - special;
    const discountPercentage = (discount / regular) * 100;
    return Math.round(discountPercentage);
  }
  return 0;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: ProductVariant): AgnosticMediaGalleryItem[] =>
  (product ? product.images : [])
    .map((image) => {
      const imgPath = image.originalSrc.substring(0, image.originalSrc.lastIndexOf('.'));
      const imgext = image.originalSrc.split('.').pop();
      const imgSmall = imgPath + '_160x160.' + imgext;
      const imgBig = imgPath + '_295x295.' + imgext;
      const imgNormal = imgPath + '_600x600.' + imgext;
      return ({
        small: imgSmall,
        big: imgBig,
        normal: imgNormal
      });
    });

export const getActiveVariantImage = (product) => {
  if (product) {
    let productImg = product._coverImage.originalSrc;
    if (product.variantBySelectedOptions && product.variantBySelectedOptions !== null)
      productImg = product.variantBySelectedOptions.image.originalSrc;
    for (let i = 1; i < (product.images).length; i++) {
      if (product.images[i].originalSrc === productImg) {
        return i;
      }
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products, filters: ProductVariantFilters | any = {}) => {
  if (!products) {
    return [];
  }
  products = Array.isArray(products) ? products : [products];
  return enhanceProduct(products);
};
export const getFilteredSingle = (product) => {
  if (!product) {
    return [];
  }
  product = Array.isArray(product) ? product : [product];
  return enhanceProduct(product);
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
  }; */
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
    [capitalize(curr.name)]: isSingleProduct ? curr.value : [
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

export const getProductVariantId = (product: ProductVariant): string => (product as any)?.variants[0].id || '';

export const getProductId = (product: ProductVariant): string => (product as any)?._id || '';

export const getProductOriginalId = (product): string => {
  if (product && product?._id) {
    const buff = Buffer.from(product?._id, 'base64');
    const decodedId = buff.toString('ascii');
    const extractedInfo = decodedId.split(/[\s/]+/).pop();
    return extractedInfo;
  }
  return '';
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getFormattedPrice = (price: number) => String(price);

export const getProductSaleStatus = (product: ProductVariant): boolean => {
  if (product && (product.availableForSale)) {
    return true;
  }
  return false;
};
export const getProductCoverImage = (product, size = 'normal') => {
  let imgResolution = '600x600';
  if (size === 'medium') {
    imgResolution = '295x295';
  } else if (size === 'small') {
    imgResolution = '80x80';
  }
  if (product && product._coverImage && product._coverImage.src) {
    const imgPath = product._coverImage.src.substring(0, product._coverImage.src.lastIndexOf('.'));
    const imgext = product._coverImage.src.split('.').pop();
    const resizedImg = imgPath + '_' + imgResolution + '.' + imgext;
    return resizedImg;
  }
  return 'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/placeholder_' + imgResolution + '.jpg?v=1625742127';
};

export const getProductCollections = (product, field = 'all') => {
  if (!product) {
    return;
  }
  if (product.collections && Object.keys(product.collections).length > 0) {
    const collections = [];
    Object.values(product.collections).map((collection: Record<string, unknown>) => {
      if (field === 'all') {
        collections.push({
          id: collection.id,
          title: collection.title,
          slug: collection.handle
        });
      } else {
        collections.push(collection[field]);
      }
    });
    return collections;
  }
  return [];
};
export const getPDPProductCoverImage = (product, size = 'normal') => {
  let imgResolution = '600x600';
  if (size === 'medium') {
    imgResolution = '295x295';
  } else if (size === 'small') {
    imgResolution = '80x80';
  }
  if (product && product._coverImage && product._coverImage.originalSrc) {
    const imgPath = product._coverImage.originalSrc.substring(0, product._coverImage.originalSrc.lastIndexOf('.'));
    const imgext = product._coverImage.originalSrc.split('.').pop();
    const resizedImg = imgPath + '_' + imgResolution + '.' + imgext;
    return resizedImg;
  }
  return 'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/placeholder_' + imgResolution + '.jpg?v=1625742127';
};

export const getProductStockStatus = (product: ProductVariant): boolean => {
  if (product && product.variantBySelectedOptions && product.variantBySelectedOptions !== null) {
    if (product.variantBySelectedOptions.quantityAvailable > 0) {
      return true;
    }
    return false;
  } else if (product && product.totalInventory > 0) {
    return true;
  }
  return false;
};
export const getProductStock = (product: ProductVariant): number => {
  if (product && product.variantBySelectedOptions && product.variantBySelectedOptions !== null) {
    return product.variantBySelectedOptions.quantityAvailable;
  } else if (product && product.totalInventory) {
    return product.totalInventory;
  }
  return 0;
};
export const checkForWishlist = (product: ProductVariant): boolean => (product as any).isInWishlist ?? false;

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
  getCollections: getProductCollections,
  getVariantImage: getActiveVariantImage,
  getFiltered: getProductFiltered,
  getDiscountPercentage: getProductDiscountPercentage,
  getFilteredSingle,
  getProductOriginalId,
  getOptions: getProductOptions,
  getAttributes: getProductAttributes,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getPDPCoverImage: getPDPProductCoverImage,
  getVariantId: getProductVariantId,
  getSaleStatus: getProductSaleStatus,
  getStockStatus: getProductStockStatus,
  getStock: getProductStock,
  getFormattedPrice,
  getTotalReviews: getProductTotalReviews,
  getAverageRating: getProductAverageRating,
  getBreadcrumbs,
  getSelectedVariant
};

export default productGetters;
