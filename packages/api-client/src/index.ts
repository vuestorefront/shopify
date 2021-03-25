import { /* webpackChunkName: 'apiClientFactory' */ apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import getBlogPosts from './api/getBlogPosts';
import editProfile from './api/editProfile';
import createCart from './api/createCart';
import addToCart from './api/addToCart';
import signUp from './api/signUp';
import signIn from './api/signIn';
import signOut from './api/signOut';
import changePassword from './api/changePassword';
import fetchCustomer from './api/fetchCustomer';
import fetchOrders from './api/fetchOrders';
import fetchAddresses from './api/fetchAddresses';
import getMe from './api/getMe';
import isGuest from './api/isGuest';
import checkOut from './api/checkOut';

const CustomClient = require('shopify-buy/index.unoptimized.umd.min.js');
const defaultSettings = {};
const cookies = {
  cartCookieName: 'vsf-cart'
};

const onSetup = (settings) => {
  return ({
    config: {
      ...defaultSettings,
      ...settings
    },
    client: CustomClient.buildClient(settings.api),
    cookies: (settings.api).cookies || cookies
  });
};

const { createApiClient } = apiClientFactory<any, any>({
  tag: 'shopify',
  onSetup,
  api: {
    getProduct,
    getCategory,
    getBlogPosts,
    editProfile,
    addToCart,
    isGuest,
    getMe,
    signUp,
    signIn,
    signOut,
    changePassword,
    fetchCustomer,
    fetchOrders,
    fetchAddresses,
    createCart,
    checkOut,
    cookies
  }
});

export {
  createApiClient
};

export * from './types';
export * from './fragments';
export * from './types/Api';
export * from './helpers/queries';

