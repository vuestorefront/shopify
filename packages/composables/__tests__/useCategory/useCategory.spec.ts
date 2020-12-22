import useCategory from './../../src/useCategory';
import { getCategory } from '@vue-storefront/shopify-api';

const categoriesResult = [
  { name: 'cat1',
    id: 'bbb' },
  { name: 'cat2',
    id: 'aaa' },
  { name: 'cat3',
    id: 'fcd' }
];

jest.mock('@vue-storefront/shopify-api', () => ({
  getCategory: jest.fn(() =>
    Promise.resolve({
      data: {
        categories: {
          results: categoriesResult
        }
      }
    }))
}));

jest.mock('@vue-storefront/core', () => ({
  useCategoryFactory: (params) => () => params
}));

describe('[shopify-composables] useCategory', () => {
  it('loads categories', async () => {
    const { categorySearch } = useCategory('test-category') as any;

    const response = await categorySearch({ catId: 'xxx1' });

    expect(response).toEqual(categoriesResult);
    expect(getCategory).toBeCalledWith({ catId: 'xxx1' }, undefined);
  });
});
