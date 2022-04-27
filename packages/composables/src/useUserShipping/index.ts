import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
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

const shipping = {
  addresses
};

const findBiggestId = () => addresses.reduce((highest, { id }) => Math.max(highest, id), 0);

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

const params: UseUserShippingFactoryParams<any, any> = {
  addAddress: async (context: Context, params?) => {
    const newAddress = {
      ...params.address,
      id: findBiggestId() + 1
    };

    if (params.address.isDefault) {
      disableOldDefault();
      addresses.unshift(newAddress);
    } else {
      addresses.push(newAddress);
    }

    return Promise.resolve(shipping);
  },

  deleteAddress: async (context: Context, params?) => {
    const indexToRemove = addresses.findIndex(address => address.id === params.address.id);
    if (indexToRemove < 0) {
      return Promise.reject(Error('This address does not exist'));
    }

    addresses.splice(indexToRemove, 1);
    return Promise.resolve(shipping);
  },

  updateAddress: async (context: Context, params?) => {
    const indexToUpdate = addresses.findIndex(address => address.id === params.address.id);
    if (indexToUpdate < 0) {
      return Promise.reject(Error('This address does not exist'));
    }

    const isNewDefault = params.address.isDefault && addresses[0].id !== params.address.id;

    if (isNewDefault) {
      disableOldDefault();
    }

    addresses[indexToUpdate] = params.address;

    if (isNewDefault) {
      addresses.sort(sortDefaultAtTop);
    }
    return Promise.resolve(shipping);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params?) => {
    console.log('Mocked: load');
    return Promise.resolve(shipping);
  },

  setDefaultAddress: async (context: Context, params?) => {
    console.log('Mocked: setDefault');
    const isDefault = id => addresses[0].id === id;

    if (!isDefault(params.address.id)) {
      const indexToUpdate = addresses.findIndex(address => address.id === params.address.id);
      if (indexToUpdate < 0) {
        return Promise.reject(Error('This address does not exist'));
      }
      disableOldDefault();
      addresses[indexToUpdate].isDefault = true;
      addresses.sort(sortDefaultAtTop);
    }

    return Promise.resolve(shipping);
  }
};

export default useUserShippingFactory<any, any>(params);
