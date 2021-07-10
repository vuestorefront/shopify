/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const buildBreadcrumbsList = (rootCat, bc) => {
  const newBc = [...bc, { text: rootCat.title, link: rootCat.handle }];
  return rootCat.parent ? buildBreadcrumbsList(rootCat.parent, newBc) : newBc;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const buildBreadcrumbs = (rootCat) =>
  buildBreadcrumbsList(rootCat, [])
    .reverse()
    .reduce((prev, curr, index) => ([
      ...prev,
      { ...curr, link: `${prev[index - 1]?.link || '' }/${curr.link}` }]),
    []);

const filterFacets = criteria => f => criteria ? criteria.includes(f) : true;

const createFacetsFromOptions = (facets, filters, filterKey) => {
  const options = facets[filterKey]?.options || [];
  const selectedList = filters && filters[filterKey] ? filters[filterKey] : [];

  return options
    .map(({ label, value }) => ({
      type: 'attribute',
      id: label,
      attrName: filterKey,
      value,
      selected: selectedList.includes(value),
      count: null
    }));
};

export const reduceForFacets = (facets, filters) => (prev, curr) => ([
  ...prev,
  ...createFacetsFromOptions(facets, filters, curr)
]);

export const reduceForGroupedFacets = (facets, filters) => (prev, curr) => {
  return ([
    ...prev,
    {
      id: curr,
      label: curr,
      options: createFacetsFromOptions(facets, filters, curr),
      count: null
    }
  ]);
};

export const getSectionDataByKey = (sectionDataArray, sectionId) => {
  for (const [key, value] of Object.entries(sectionDataArray.fields)) {
    if (key === sectionId) {
      return value;
    }
  }
};

export const getContentfulAssetById = (ContentfulproductAssets, AssetId) => {
  if (typeof AssetId !== 'string') return '';
  const assetData = ContentfulproductAssets.find(asset => asset.sys.id === AssetId);
  return assetData.fields.file;
};
export const getContentfulEntryById = (ContentfulproductEntries, EntryId) => {
  if (typeof EntryId !== 'string') return '';
  const entryData = ContentfulproductEntries.find(entry => entry.sys.id === EntryId);
  return entryData.fields;
};

export const buildFacets = (searchData, reduceFn, criteria?: string[]) => {
  if (!searchData?.data) {
    return [];
  }
  const {
    data: { facets },
    input: { filters }
  } = searchData;
  return Object.keys(facets)
    .filter(filterFacets(criteria))
    .reduce(reduceFn(facets, filters), []);
};
