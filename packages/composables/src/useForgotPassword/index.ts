
import {
  Context,
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams
} from '@vue-storefront/core';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, { email, customQuery }) => {
    console.log('Mocked: resetPassword');
    return await {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (context: Context, { tokenValue, newPassword, customQuery }) => {
    console.log('Mocked: setNewPassword');
    return await {};
  }
};

export const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);
