import { CategoryQueryResult } from '../../types/GraphQL';
import { getSettings } from '../../index';

interface CategoryData {
  categories: CategoryQueryResult;
}

const getCategory = async (params) => {
  const { spclient } = getSettings();
  
  const request = await spclient.collection.fetchAll();
  return request;
};

export default getCategory;

