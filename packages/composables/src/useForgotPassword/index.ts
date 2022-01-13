
import {
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams
} from '@vue-storefront/core';
import { Context } from '../types'

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  resetPassword: async (context: Context, { email }) => {
    const response = await context.$shopify.api.customerRecover({
      email
    })

    console.log(response)

    return response
  },
  setNewPassword: async (context: Context, { tokenValue, newPassword, customQuery }) => {
    console.log('Mocked: setNewPassword');
    return {};
  }
};

export default useForgotPasswordFactory<any>(factoryParams);
