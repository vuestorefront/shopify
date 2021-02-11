import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import getBlogPosts from './api/getBlogPosts';
import addToCart from './api/addToCart';
import getMe from './api/getMe';
import isGuest from './api/isGuest';
import checkOut from './api/checkOut';
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
    getCategory,
    getBlogPosts,
    addToCart,
    isGuest,
    getMe,
    // createCart,
    checkOut
  }
});

export {
  createApiClient
};

export * from './types';
export * from './fragments';
export * from './types/Api';
export * from './helpers/queries';

