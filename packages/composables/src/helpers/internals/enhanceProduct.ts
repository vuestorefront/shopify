import { ProductVariant } from "@vue-storefront/shopify-api";

type EnhancedProduct = ProductVariant

const enhanceProduct = (productResponse) => {
  if (Object.keys(productResponse).length === 0) return [] as ProductVariant[];

  let products = []
  if (Array.isArray(productResponse)) {
    products = productResponse.filter(item => Object.keys(item).length !== 0)
  }

  const enhancedProductResponse: EnhancedProduct[] = products.map((product) => ({
    ...product,
    name: product.title,
    images: product?.images,
    price: {
      original: product.variantBySelectedOptions && product.variantBySelectedOptions !== null ? product.variantBySelectedOptions?.compareAtPriceV2?.amount : product.variants ? product.variants[0].compareAtPriceV2?.amount : 0,
      current: product.variantBySelectedOptions && product.variantBySelectedOptions !== null ? product.variantBySelectedOptions?.priceV2?.amount : product.variants ? product.variants[0].priceV2?.amount : 0
    },
    available: product.variantBySelectedOptions && product.variantBySelectedOptions !== null ? product.variantBySelectedOptions?.quantityAvailable : product.variants ? product.variants[0].availableForSale : true,
    productType: product.productType,
    options: product.options,
    _id: product.id,
    variantId: product.variants ? product.variants[0].id : '',
    _description: product.description,
    _descriptionHtml: product.descriptionHtml,
    _categoriesRef: [],
    _slug: product.handle,
    _coverImage: product?.images[0],
    _mainPrice: product.variants ? product.variants[0].priceV2?.amount : 0
  }) as EnhancedProduct);
  return enhancedProductResponse;
};

export default enhanceProduct;
