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
    console.log('Mocked: loadUser');
    // check for existing token, if yes user is logged in else logged out
    const token = context.$shopify.config.app.$cookies.get('token');
    const result: any = await context.$shopify.api.fetchCustomer(token);
    let customer = null;
    if (result) {
      customer = result.customer;
      return customer;
    }
    return customer;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    console.log('Mocked: logOut');
    const token = context.$shopify.config.app.$cookies.get('token');
    context.$shopify.config.app.$cookies.remove('token');
    await context.$shopify.api.signOut(token);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: updateUser');
    const token = context.$shopify.config.app.$cookies.get('token');
    await context.$shopify.api.editProfile({
      token: token,
      profile: { email: updatedUserData.email,
        firstName: updatedUserData.firstName,
        lastName: updatedUserData.lastName
      }});
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, password, firstName, lastName }) => {
    console.log('Mocked: register');
    const result: any = await context.$shopify.api.signUp({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    });
    const response: User = {
      error: (result.customerCreate.customerUserErrors.length) ? result.customerCreate.customerUserErrors[0].message : ''
    };
    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    console.log('Mocked: logIn');
    const result: any = await context.$shopify.api.signIn({ username, password });
    const response: User = {
      token: (result.customerAccessTokenCreate.customerAccessToken) ? result.customerAccessTokenCreate.customerAccessToken.accessToken : null,
      error: (result.customerAccessTokenCreate.customerUserErrors.length) ? result.customerAccessTokenCreate.customerUserErrors[0].message : ''
    };
    // store token in cookie
    context.$shopify.config.app.$cookies.set('token', response.token);
    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    console.log('Mocked: changePassword');
    let token = context.$shopify.config.app.$cookies.get('token');
    const result: any = await context.$shopify.api.changePassword(token, newPassword);
    token = result.customerUpdate.customerAccessToken.accessToken;
    // store updated user token
    context.$shopify.config.app.$cookies.set('token', token);
    return {};
  }
};

export default useUserFactory<User, any, any>(params);
