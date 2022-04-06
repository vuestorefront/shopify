/* istanbul ignore file */

import {
  Context as CoreContext,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { User, Context as CustomContext } from '../types';

type Context = CoreContext | CustomContext

const params: UseUserFactoryParams<User, any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    // check for existing token, if yes user is logged in else logged out
    const app = context.$shopify.config.app;
    const appKey = app.$config.appKey;
    const token = app.$cookies.get(appKey + '_token');
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
    const app = context.$shopify.config.app;
    const appKey = app.$config.appKey;
    const token = app.$cookies.get(appKey + '_token');
    app.$cookies.remove(appKey + '_token');
    await context.$shopify.api.signOut(token);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    const app = context.$shopify.config.app;
    const appKey = app.$config.appKey;
    const token = app.$cookies.get(appKey + '_token');
    await context.$shopify.api.editProfile({
      token,
      profile: {
        email: updatedUserData.email ? updatedUserData.email : '',
        firstName: updatedUserData.firstName ? updatedUserData.firstName : '',
        lastName: updatedUserData.lastName ? updatedUserData.lastName : '',
        acceptsMarketing: updatedUserData.acceptsMarketing ? updatedUserData.acceptsMarketing : false,
        phone: updatedUserData.phone ? updatedUserData.phone : null
      }
    });
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: CustomContext, { email, password, firstName, lastName }) => {
    const result = await context.$shopify.api.customerCreate({
      email,
      firstName,
      lastName,
      acceptsMarketing: false,
      password
    });

    const response: User = {
      token: 'SignUpSuccess',
      error: (result.data.customerUserErrors?.length) ? result.data.customerUserErrors[0].message : ''
    };
    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    if (username && !password) {
      const result = await context.$shopify.api.forgotPassword({ username });
      const response: User = {
        token: 'forgotPassword',
        error: result?.data?.customerRecover?.customerUserErrors[0]?.message || result?.errors?.[0]?.message || ''
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
      const app = context.$shopify.config.app;
      const appKey = app.$config.appKey;
      app.$cookies.set(appKey + '_token', response.token);
    }
    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    const app = context.$shopify.config.app;
    const appKey = app.$config.appKey;
    let token = app.$cookies.get(appKey + '_token');
    const result: any = await context.$shopify.api.changePassword({ token, newPassword });
    token = result.customerUpdate.customerAccessToken.accessToken;
    // store updated user token
    if (token !== null) {
      app.$cookies.set(appKey + '_token', token);
    }
    return {};
  }
};

export default useUserFactory<User, any, any>(params);
