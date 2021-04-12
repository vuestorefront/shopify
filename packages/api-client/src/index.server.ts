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

// const tokenExtension = {
//   name: 'tokenExtension',
//   hooks: (req, res) => {
//     const rawCurrentToken = req.cookies['vsf-shopify-token'];
//     const currentToken = parseToken(rawCurrentToken);

//     return {
//       beforeCreate: ({ configuration }) => ({
//         ...configuration,
//         auth: {
//           onTokenChange: (newToken) => {
//             if (!currentToken || currentToken.access_token !== newToken.access_token) {
//               res.cookie('vsf-shopify-token', JSON.stringify(newToken));
//             }
//           },
//           onTokenRead: () => {
//             res.cookie('vsf-shopify-token', rawCurrentToken);
//             return currentToken;
//           },
//           onTokenRemove: () => {
//             delete req.cookies['vsf-shopify-token'];
//           }
//         }
//       })
//     };
//   },
// };

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
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
  // extensions: [tokenExtension]
});

export {
  createApiClient
};

export * from './types';
export * from './fragments';
export * from './types/Api';
export * from './helpers/queries';

