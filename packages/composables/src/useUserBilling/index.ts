import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from '@vue-storefront/core';

const addresses: any[] = [
  {
    id: 1,
    email: 'john@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    streetName: 'Warsawska',
    apartment: '24/193A',
    city: 'Phoenix',
    state: null,
    zipCode: '26-620',
    country: 'US',
    phoneNumber: '560123456',
    isDefault: true
  },
  {
    id: 2,
    email: 'havaka@gmail.com',
    firstName: 'Jonatan',
    lastName: 'Doe',
    streetName: 'Starachowicka',
    apartment: '20/193A',
    city: 'Atlanta',
    state: null,
    zipCode: '53-603',
    country: 'US',
    phoneNumber: '560123456',
    isDefault: false
  }
];

const billing = {
  addresses
};

// const findBiggestId = () => Math.random().toString().substr(2);

const disableOldDefault = () => {
  const oldDefault = addresses.find(address => address.isDefault);
  if (oldDefault) {
    oldDefault.isDefault = false;
  }
};

const sortDefaultAtTop = (a, b) => {
  if (a.isDefault) {
    return -1;
  } else if (b.isDefault) {
    return 1;
  }
  return 0;
};

const params: UseUserBillingFactoryParams<any, any> = {
  addAddress: async (context: Context, params?) => {
    const appKey = context.$shopify.config.app.$config.appKey;
    const token = context.$shopify.config.app.$cookies.get(appKey + '_token');
    const formatedAddress = {
      address1: params.address.streetName,
      address2: params.address.apartment,
      city: params.address.city,
      company: params.address.company,
      country: 'United States',
      firstName: params.address.firstName,
      lastName: params.address.lastName,
      phone: params.address.phone,
      province: params.address.state,
      zip: params.address.postalCode
    };
    const result: any = await context.$shopify.api.addAddress({ token: token, address: formatedAddress});
    if (result) {
      if (result.customerUserErrors.length === 0) {
        return true;
      }
      return false;
    }
  },

  deleteAddress: async (context: Context, params) => {
    const appKey = context.$shopify.config.app.$config.appKey;
    const token = context.$shopify.config.app.$cookies.get(appKey + '_token');
    const result: any = await context.$shopify.api.deleteAddress({ token: token, AddressId: params.address.id });
    if (result) {
      if (result.customerUserErrors.length === 0) {
        return true;
      }
      return false;
    }
  },

  updateAddress: async (context: Context, params?) => {
    const appKey = context.$shopify.config.app.$config.appKey;
    const token = context.$shopify.config.app.$cookies.get(appKey + '_token');
    const formatedAddress = {
      address1: params.address.streetName,
      address2: params.address.apartment,
      city: params.address.city,
      company: params.address.company,
      country: 'United States',
      firstName: params.address.firstName,
      lastName: params.address.lastName,
      phone: params.address.phone,
      province: params.address.state,
      zip: params.address.postalCode
    };
    const result: any = await context.$shopify.api.updateAddress({ token: token, AddressId: params.address.id, address: formatedAddress});
    if (result) {
      if (result.customerUserErrors.length === 0) {
        return true;
      }
      return false;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params?) => {
    const appKey = context.$shopify.config.app.$config.appKey;
    const token = context.$shopify.config.app.$cookies.get(appKey + '_token');
    const result: any = await context.$shopify.api.fetchAddresses(token);
    let addresses = {};
    if (result) {
      addresses = result;
      return addresses;
    }
    return addresses;
  },

  setDefaultAddress: async (context: Context, params?) => {
    console.log('Mocked: setDefault');
    const isDefault = id => addresses[0].id === id;

    if (!isDefault(params.address.id)) {
      const indexToUpdate = addresses.findIndex(address => address.id === params.address.id);
      if (indexToUpdate < 0) {
        return Promise.reject('This address does not exist');
      }
      disableOldDefault();
      addresses[indexToUpdate].isDefault = true;
      addresses.sort(sortDefaultAtTop);
    }

    return Promise.resolve(billing);
  }
};

export default useUserBillingFactory<any, any>(params);
