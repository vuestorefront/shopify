import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import { Category } from '@vue-storefront/shopify-api/src/types';
export declare const getCategoryTree: (category: Category) => AgnosticCategoryTree;
declare const categoryGetters: CategoryGetters<Category>;
export default categoryGetters;
