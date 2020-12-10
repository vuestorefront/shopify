import { ApolloQueryResult } from 'apollo-client';
import { ProductQueryResult } from './../../types/GraphQL';

interface ProductData {
  products: ProductQueryResult;
}
// eslint-disable-next-line prefer-const
const enhanceProduct = (productResponse: ApolloQueryResult<ProductData>): ApolloQueryResult<ProductData> => {
  // (productResponse.data as any)._variants = productResponse.data.products.results
  (productResponse as any)._variants = productResponse;

  /* productsList.map((product) => {
    const current = product.masterData.current;
    const current = product;

    return current.variants.map((variant) => ({
      ...variant,
      _name: current.name,
      _slug: current.slug,
      _id: product.id,
      _master: current.masterVariant.id === variant.id,
      _description: current.description,
      _categoriesRef: current.categoriesRef.map((cr) => cr.id),
      _rating: (product as any).reviewRatingStatistics
    }));
  })
    .reduce((prev, curr) => [...prev, ...curr], []); */

  return productResponse;
};

export default enhanceProduct;
