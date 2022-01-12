import { ProductVariant } from "@vue-storefront/shopify-api";

type EnhancedProduct = ProductVariant

const enhanceProduct = (productResponse) => {
  if (Object.keys(productResponse).length === 0) return;
  const enhancedProductResponse: EnhancedProduct[] = productResponse.map((product) => ({
    ...product,
    name: product.variantBySelectedOptions && product.variantBySelectedOptions !== null ? product.variantBySelectedOptions.title : product.title,
    images: product?.images,
    // price: {
    //   original: product.variantBySelectedOptions && product.variantBySelectedOptions !== null ? product.variantBySelectedOptions?.compareAtPriceV2?.amount : product.variants[0].compareAtPriceV2?.amount,
    //   current: product.variantBySelectedOptions && product.variantBySelectedOptions !== null ? product.variantBySelectedOptions?.priceV2?.amount : product.variants[0].priceV2?.amount
    // },
    // available: product.variantBySelectedOptions && product.variantBySelectedOptions !== null ? product.variantBySelectedOptions?.quantityAvailable : product.variants[0].availableForSale,
    productType: product.productType,
    options: product.options,
    _id: product.id,
    // variantId: product.variants[0].id,
    _description: product.description,
    _descriptionHtml: product.descriptionHtml,
    _categoriesRef: [],
    _slug: product.handle,
    _coverImage: product?.images[0],
    // _mainPrice: product.variants[0].priceV2?.amount
  }) as EnhancedProduct);
  console.log('enhancedProductResponse::', enhancedProductResponse);
  return false;
  return enhancedProductResponse;
};

export default enhanceProduct;
