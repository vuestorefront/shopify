import { apiClientFactory } from '@vue-storefront/core';

// TODO: extract api's into another directory
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import editProfile from './api/editProfile';
import getBlogPosts from './api/getBlogPosts';
import getPages from './api/getPages';
import updateCart from './api/updateCart';
import createCart from './api/createCart';
import addToCart from './api/addToCart';
import removeFromCart from './api/removeFromCart';
import signUp from './api/signUp';
import signIn from './api/signIn';
import signOut from './api/signOut';
import changePassword from './api/changePassword';
import forgotPassword from './api/forgotPassword';
import fetchCustomer from './api/fetchCustomer';
import fetchOrders from './api/fetchOrders';
import fetchAddresses from './api/fetchAddresses';
import deleteAddress from './api/deleteAddress';
import addAddress from './api/addAddress';
import updateAddress from './api/updateAddress';
import checkOut from './api/checkOut';

import { createShopifyApollo, getShopifyApolloAPIs } from '@vue-storefront/shopify-apollo'

const CustomClient = require('shopify-buy/index.unoptimized.umd.min.js');

const defaultSettings = {};
const cookies = {
  cartCookieName: 'vsf-cart'
};

const onCreate = (settings) => {
  const client = CustomClient.buildClient(settings.api)

  client.apolloClient = createShopifyApollo(settings)

  return ({
    config: {
      ...defaultSettings,
      ...settings
    },
    client,
    cookies: (settings.api).cookies || cookies
  });
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct,
    getCategory,
    getBlogPosts,
    getPages,
    editProfile,
    addToCart,
    updateCart,
    removeFromCart,
    signUp,
    signIn,
    signOut,
    changePassword,
    forgotPassword,
    fetchCustomer,
    fetchOrders,
    fetchAddresses,
    deleteAddress,
    addAddress,
    updateAddress,
    createCart,
    checkOut,
    cookies,
    ...getShopifyApolloAPIs()
  }
});

export {
  createApiClient
};
