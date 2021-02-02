import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import Client from 'shopify-buy';

const defaultSettings = {};

const onSetup = (settings) => {
  return ({
    config: {
      ...defaultSettings,
      ...settings
    },
    client: Client.buildClient(settings.api, fetch)
  });
};

const { createApiClient } = apiClientFactory<any, any>({
  tag: 'shopify',
  onSetup,
  api: {
    getProduct,
    getCategory
  }
});

export {
  createApiClient,
  getCategory,
  getProduct
};

export * from './types';
