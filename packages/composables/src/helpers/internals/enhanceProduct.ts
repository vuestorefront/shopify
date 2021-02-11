// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const enhanceProduct = (productResponse: Array<any>) => {
  const enhancedProductResponse = productResponse.map((product) => ({
    ...product,
    name: product.title,
    images: product?.images,
    price: {
      original: product.variants[0].compareAtPrice,
      current: product.variants[0].price
    },
    available: product.variants[0].available,
    productType: product.productType,
    options: product.options,
    _id: product.id,
    variantId: product.variants[0].id,
    _description: product.description,
    _descriptionHtml: product.descriptionHtml,
    _categoriesRef: [],
    _slug: product.handle,
    _coverImage: product?.images[0],
    _mainPrice: product.variants[0].price
  }));
  return enhancedProductResponse;
};

export default enhanceProduct;
