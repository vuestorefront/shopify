import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import { ProductVariant } from './../types/GraphQL';
import { getProductFiltered } from './productGetters';
import { getCategoryTree as buildCategoryTree } from './categoryGetters';
import { buildBreadcrumbs, buildFacets, reduceForGroupedFacets, reduceForFacets } from './../useFacet/_utils';
import { FacetResultsData, SearchData } from './../types';
// import { params } from 'src/useUser/factoryParams';

const getAll = (searchData: SearchData, criteria?: string[]): AgnosticFacet[] => buildFacets(searchData, reduceForFacets, criteria);

const getGrouped = (searchData: SearchData, criteria?: string[]): AgnosticGroupedFacet[] =>
  buildFacets(searchData, reduceForGroupedFacets, criteria);

const getSortOptions = (searchData: SearchData): AgnosticSort => {
  const options = [
    { type: 'sort', id: 'latest', value: 'Latest', count: null },
    { type: 'sort', id: 'price-up', value: 'Price from low to high', count: null },
    { type: 'sort', id: 'price-down', value: 'Price from high to low', count: null }
  ].map(o => ({ ...o, selected: o.id === searchData.input.sort }));

  const selected = options.find(o => o.id === searchData.input.sort)?.id || 'latest';

  return { options, selected };
};

const getCategoryTree = (searchData: SearchData): AgnosticCategoryTree => {
  if (!searchData.data) {
    return {} as any;
  }

  return buildCategoryTree(searchData.data.categories[0]);
};

const getProducts = (searchData: SearchData): ProductVariant[] => {
  return getProductFiltered(searchData.data.products, { master: false });
};

const getPagination = (searchData: SearchData): AgnosticPagination => {
  if (!searchData.data) {
    return {} as any;
  }

  return {
    currentPage: searchData.input.page,
    totalPages: Math.ceil(searchData.data.total / searchData.data.itemsPerPage),
    totalItems: searchData.data.total,
    itemsPerPage: searchData.input.itemsPerPage,
    pageOptions: searchData.data.perPageOptions
  };
};

const getBreadcrumbs = (searchData: SearchData): AgnosticBreadcrumb[] => {
  if (!searchData.data) {
    return [];
  }
  // fetch curren category slug
  const curCategoryPage = searchData.input.categorySlug;
  const allCategories = searchData.data.categories;
  let curCatIndex = 0;

  // fetch index from category array to generate link and title
  for (let i = 0; i < allCategories.length; i++) {
    // eslint-disable-next-line dot-notation
    if (allCategories[i]['handle'] === curCategoryPage) {
      curCatIndex = i;
      break;
    } else {
      curCatIndex = 0;
    }
  }
  return [
    { text: 'Home', link: '/' },
    ...buildBreadcrumbs(searchData.data.categories[curCatIndex]).map(b => ({ ...b, link: `/c${b.link}` }))
  ];
};

const facetGetters: FacetsGetters<FacetResultsData, ProductVariant[]> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
