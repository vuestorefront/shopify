/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import { buildBreadcrumbs, buildFacets, reduceForFacets } from './../useFacet/_utils';
import { getCategoryTree as buildCategoryTree } from './categoryGetters';
import { enhanceProduct, getSortedProducts } from '../helpers/internals';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAll = (searchData, criteria?: string[]): AgnosticFacet[] => buildFacets(searchData, reduceForFacets, criteria);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] => [];
// buildFacets(searchData, reduceForGroupedFacets, criteria);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSortOptions = (searchData): AgnosticSort => {
  const options = [
    { type: 'sort', id: 'latest', value: 'Latest', count: null },
    { type: 'sort', id: 'title(asc)', value: 'Title: A to Z', count: null },
    { type: 'sort', id: 'title(dsc)', value: 'Title: Z to A', count: null },
    { type: 'sort', id: 'price-up', value: 'Price: Low to high', count: null },
    { type: 'sort', id: 'price-down', value: 'Price: High to low', count: null }
  ].map(o => ({ ...o, selected: o.id === searchData.input.sort }));

  const selected = options.find(o => o.id === searchData.input.sort)?.id || 'latest';

  return { options, selected };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategoryTree = (searchData) => {
  if (!searchData.data) {
    return {} as any;
  }
  const allCats = searchData.data.categories;
  const formattedCats = [];
  for (let c = 0; c < allCats.length; c++) {
    formattedCats.push(buildCategoryTree(searchData.data.categories[c]));
  }
  return formattedCats;
};

const identifyCurrentCat = (searchData): any => {
  if (searchData.input === null) {
    return 0;
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
    }
  }
  return curCatIndex;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = (searchData): any => {
  if (searchData.input === null || searchData.data === null) {
    return {};
  }
  let catProducts = [];
  const sortBy = searchData.input.sort;
  if (!Array.isArray(searchData.data.categories)) {
    catProducts = getSortedProducts(enhanceProduct(searchData.data.categories.products), sortBy);
  } else {
    const curCatIndex = identifyCurrentCat(searchData);
    catProducts = getSortedProducts(enhanceProduct(searchData.data.categories[curCatIndex].products), sortBy);
  }
  const products = enhanceProduct(catProducts);
  return products;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPagination = (searchData): AgnosticPagination => {
  if (!searchData.data) {
    return {} as any;
  }
  return {
    currentPage: searchData.input.page,
    totalPages: Math.ceil(searchData.data.categories.products.length / searchData.data.itemsPerPage),
    totalItems: searchData.data.categories.products.length,
    itemsPerPage: searchData.input.itemsPerPage,
    pageOptions: searchData.data.perPageOptions
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBreadcrumbs = (searchData): AgnosticBreadcrumb[] => {
  if (!searchData.data) {
    return [];
  }
  return [
    { text: 'Home', link: '/' },
    ...buildBreadcrumbs(searchData.data.categories).map(b => ({ ...b, link: `/c${b.link}` }))
  ];
};

const facetGetters: FacetsGetters<any, any> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
