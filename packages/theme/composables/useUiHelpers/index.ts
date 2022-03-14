import { getCurrentInstance } from '@nuxtjs/composition-api';
import { Category } from '@vue-storefront/shopify-api';
import { AgnosticFacet } from '@vue-storefront/core';

const nonFilters = ['page', 'sort', 'term', 'itemsPerPage'];

const getContext = () => {
  const vm = getCurrentInstance();
  return vm.root.proxy;
};

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]]
  };
};

const getFiltersDataFromUrl = (context, onlyFilters) => {
  const { query } = context.$router.history.current;

  return Object.keys(query)
    .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
    .reduce(reduceFilters(query), {});
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUiHelpers = () => {
  const context = getContext();

  const getFacetsFromURL = () => {
    const { query, params } = context.$router.currentRoute;
    const categorySlug = Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(query.page as string, 10) || 1,
      sort: query.sort || 'latest',
      filters: getFiltersDataFromUrl(context, true),
      itemsPerPage: parseInt(query.itemsPerPage as string, 12) || 20,
      term: query.term
    };
  };

  const getCatLink = (category: Category): string => {
    return `/c/${category.slug}`;
  };

  const changeSorting = (sort: string) => {
    const { query } = context.$router.currentRoute
    context.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters: any) => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        ...filters
      }
    });
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        itemsPerPage
      }
    });
  };

  const changeSearchTerm = (term: string) => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        term: term || undefined
      }
    });
  };

  const isFacetColor = (facet: AgnosticFacet): boolean => facet.id === 'color';

  const isFacetCheckbox = (): boolean => false;

  const formatDate = (date: string) => {
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const toFormatDate = new Date(date);
    return monthsArray[toFormatDate.getMonth()] + ' ' + toFormatDate.getDate() + ', ' + toFormatDate.getFullYear() + ' at ' + toFormatDate.getHours() + ':' + toFormatDate.getMinutes();
  }

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    changeSearchTerm,
    isFacetColor,
    isFacetCheckbox,
    formatDate
  };
};

export default useUiHelpers;
