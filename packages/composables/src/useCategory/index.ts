import { UseCategory } from '@vue-storefront/core';
import { getCategory } from '@vue-storefront/shopify-api';
import { Category } from './../types/GraphQL';
import { useCategoryFactory, UseCategoryFactoryParams } from '@vue-storefront/core';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (params) => {
    const categoryResponse = await getCategory(params);
    return categoryResponse;
  }
};

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>(params);

export default useCategory;
