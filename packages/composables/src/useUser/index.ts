/* istanbul ignore file */

import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { User } from '../types';
const params: UseUserFactoryParams<User, any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    // check for existing token, if yes user is logged in else logged out
    const appKey = context.$shopify.config.app.$config.appKey;
    const token = context.$shopify.config.app.$cookies.get(appKey + '_token');
    const result: any = await context.$shopify.api.fetchCustomer(token);
    let customer = null;
    if (result) {
      customer = result.customer;
      if (customer) {
        customer.token = token;
      }
      return customer;
    }
    return customer;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    const appKey = context.$shopify.config.app.$config.appKey;
    const token = context.$shopify.config.app.$cookies.get(appKey + '_token');
    context.$shopify.config.app.$cookies.remove(appKey + '_token');
    await context.$shopify.api.signOut(token);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    const appKey = context.$shopify.config.app.$config.appKey;
    const token = context.$shopify.config.app.$cookies.get(appKey + '_token');
    await context.$shopify.api.editProfile({
      token,
      profile: { email: updatedUserData.email,
        firstName: updatedUserData.firstName,
        lastName: updatedUserData.lastName
      }});
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, userPassword, firstName, lastName }) => {
    const result: any = await context.$shopify.api.signUp({
      email,
      firstName,
      lastName,
      password: userPassword
    });
    const response: User = {
      token: 'SignUpSuccess',
      error: (result.customerCreate.customerUserErrors.length) ? result.customerCreate.customerUserErrors[0].message : ''
    };
    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    if (username && !password) {
      const result = await context.$shopify.api.forgotPassword({ username });
      const response: User = {
        token: 'forgotPassword',
        error: result?.customerRecover?.customerUserErrors[0]?.message || ''
      };
      return response;
    }
    const result: any = await context.$shopify.api.signIn({ username, password });
    const response: User = {
      token: (result.customerAccessTokenCreate.customerAccessToken) ? result.customerAccessTokenCreate.customerAccessToken.accessToken : null,
      error: (result.customerAccessTokenCreate.customerUserErrors.length) ? result.customerAccessTokenCreate.customerUserErrors[0].message : ''
    };
    // store token in cookie
    if (response.token !== null) {
      const appKey = context.$shopify.config.app.$config.appKey;
      context.$shopify.config.app.$cookies.set(appKey + '_token', response.token);
    }
    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    const appKey = context.$shopify.config.app.$config.appKey;
    let token = context.$shopify.config.app.$cookies.get(appKey + '_token');
    const result: any = await context.$shopify.api.changePassword({ token, newPassword });
    token = result.customerUpdate.customerAccessToken.accessToken;
    // store updated user token
    if (token !== null) {
      context.$shopify.config.app.$cookies.set(appKey + '_token', token);
    }
    return {};
  }
};

export default useUserFactory<User, any, any>(params);
