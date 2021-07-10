import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import editProfile from './api/editProfile';
import getBlogPosts from './api/getBlogPosts';
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

const CustomClient = require('shopify-buy/index.unoptimized.umd.min.js');
const defaultSettings = {};
const cookies = {
  cartCookieName: 'vsf-cart'
};

const onCreate = (settings) => {
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
  onCreate,
  api: {
    getProduct,
    getCategory,
    getBlogPosts,
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
    cookies
  }
});

export {
  createApiClient
};
