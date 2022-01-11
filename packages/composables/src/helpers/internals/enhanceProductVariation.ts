// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const enhanceProductVariation = (productResponse) => {
  const enhancedProductResponse = productResponse.map((variant) => ({
    name: variant.product.title,
    images: variant.product.images,
    price: {
      original: variant.compareAtPriceV2?.amount,
      current: variant.priceV2?.amount
    },
    available: variant.availableForSale,
    productType: variant.product.productType,
    options: variant.product.options,
    variantId: variant.id,
    id: variant.id,
    _description: variant.product.description,
    _descriptionHtml: variant.product.descriptionHtml,
    _categoriesRef: [],
    _slug: variant.product.handle,
    _coverImage: variant.image,
    _mainPrice: variant.priceV2?.amount
  }));
  return enhancedProductResponse;
};

export default enhanceProductVariation;
