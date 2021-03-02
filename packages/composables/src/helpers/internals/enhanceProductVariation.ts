// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const enhanceProductVariation = (productResponse) => {
  const enhancedProductResponse = productResponse.map((variant) => ({
    name: variant.product.title,
    images: variant.product.images,
    price: {
      original: variant.compareAtPrice,
      current: variant.price
    },
    available: variant.available,
    productType: variant.product.productType,
    options: variant.product.options,
    variantId: variant.id,
    _description: variant.product.description,
    _descriptionHtml: variant.product.descriptionHtml,
    _categoriesRef: [],
    _slug: variant.product.handle,
    _coverImage: variant.image,
    _mainPrice: variant.price
  }));
  return enhancedProductResponse;
};

export default enhanceProductVariation;
