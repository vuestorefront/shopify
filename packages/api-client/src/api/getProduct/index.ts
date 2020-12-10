/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CustomQueryFn, getSettings } from '../../index';

const getProduct = async (params, customQueryFn?: CustomQueryFn) => {

  const { spclient } = getSettings();

  const request = await spclient.product.fetchAll();
  return request;
};

export default getProduct;
