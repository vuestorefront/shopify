// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getSortedProducts = (productResponse: Array<any>, sortBy: string) => {
  let sortKey = '_id';
  if (sortBy === 'title(asc)' || sortBy === 'title(dsc)') {
    sortKey = 'name';
  } else if ((sortBy === 'price-up') || (sortBy === 'price-down')) {
    sortKey = '_mainPrice';
  }
  return productResponse.sort((a, b) => {
    const x = a[sortKey];
    const y = b[sortKey];
    if ((sortBy === 'price-down') || (sortBy === 'title(dsc)')) {
      return (((x < y) ? -1 : ((x > y) ? 1 : 0))) * -1;
    }
    return (((x < y) ? -1 : ((x > y) ? 1 : 0)));
  });
};

export default getSortedProducts;
