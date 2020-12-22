import useProduct from '../../src/useProduct';
import enhanceProducts from './../../src/helpers/internals/enhanceProduct';
import { getProduct } from '@vue-storefront/shopify-api';

const product = (name, slug, id) => ({
  masterData: {
    current: {
      name,
      slug,
      masterVariant: {
        id
      },
      categoriesRef: [{ id: 'aaa' }],
      allVariants: [{ id: '123' }, { id: '456' }, { id: '789' }]
    }
  }
});

const productResponse = {
  data: {
    products: {
      total: 54,
      results: [
        product('prod1', 'prod-1', 'sde213')
      ],
      availableSortingOptions: [
        { value: 'latest', label: 'Latest' },
        { value: 'price-up', label: 'Price from low to high' },
        { value: 'price-down', label: 'Price from high to low' }
      ]
    },
    _variants: [product('prod1', 'prod-1', 'xxx1'), product('prod2', 'prod-2', 'xxx2')]
  }
};

jest.mock('@vue-storefront/shopify-api', () => ({
  getProduct: jest.fn(() => Promise.resolve(productResponse))
}));

jest.mock('./../../src/helpers/internals/enhanceProduct', () => jest.fn((args) => args));

jest.mock('@vue-storefront/core', () => ({
  useProductFactory: (params) => () => params
}));

describe('[commercetools-composables] useProduct', () => {
  it('loads product variants', async () => {
    const { productsSearch } = useProduct('test-product') as any;

    const response = await productsSearch({ id: 'product-id' });

    expect(response).toEqual({
      data: [product('prod1', 'prod-1', 'xxx1'), product('prod2', 'prod-2', 'xxx2')],
      total: 54,
      availableFilters: {},
      availableSortingOptions: [
        { value: 'latest', label: 'Latest' },
        { value: 'price-up', label: 'Price from low to high' },
        { value: 'price-down', label: 'Price from high to low' }
      ]
    });
    expect(getProduct).toBeCalledWith({ id: 'product-id' }, undefined);
    expect(enhanceProducts).toBeCalledWith(productResponse);
  });
});
