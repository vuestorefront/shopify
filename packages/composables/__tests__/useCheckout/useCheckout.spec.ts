const billingDetails = { value: {} };
const shippingDetails = { value: {} };
const cart = { value: { id: 'cart-id', version: 1 } };
const paymentMethods = { value: [] };
const shippingMethods = { value: [] };
const chosenPaymentMethod = { value: {} };
const chosenShippingMethod = { value: {} };
const isShippingAddressCompleted = { value: true };
const personalDetails = { value: {} };
const isBillingAddressCompleted = { value: false };
const isPersonalDetailsCompleted = { value: false };
const loading = {
  value: {
    personalDetails: false,
    paymentMethods: false,
    shippingMethods: false,
    shippingAddress: false,
    billingAddress: false,
    shippingMethod: false,
    order: false
  }
};

const resetFields = () => {
  billingDetails.value = {};
  shippingDetails.value = {};
  cart.value = { id: 'cart-id', version: 1 };
  paymentMethods.value = [];
  shippingMethods.value = [];
  chosenPaymentMethod.value = {};
  chosenShippingMethod.value = {};
  isShippingAddressCompleted.value = true;
  personalDetails.value = {};
  isBillingAddressCompleted.value = false;
  isPersonalDetailsCompleted.value = false;
  loading.value = {
    personalDetails: false,
    paymentMethods: false,
    shippingMethods: false,
    shippingAddress: false,
    billingAddress: false,
    shippingMethod: false,
    order: false
  };
};

const loadCart = jest.fn();
const setCart = jest.fn((newCart) => {
  cart.value = newCart;
});
const cartFields = { cart, loadCart };

jest.mock('./../../src/useCart', jest.fn(() => ({
  useCart: () => cartFields,
  setCart
})));

jest.mock('./../../src/useCheckout/shared', () => ({
  billingDetails,
  shippingDetails,
  paymentMethods,
  chosenPaymentMethod,
  chosenShippingMethod,
  shippingMethods,
  isShippingAddressCompleted,
  isBillingAddressCompleted,
  isPersonalDetailsCompleted,
  personalDetails,
  initialDetails: {},
  loading
}));
jest.mock('./../../src/useCheckout/initFields', () => jest.fn());
jest.mock('@vue-storefront/shopify-api', () => ({
  updateCart: jest.fn(() => ({ data: { cart: { id: 'new-cart-id' } } })),
  getShippingMethods: jest.fn(() => ({ data: { shippingMethods: [{ method: 1 }] } })),
  createMyOrderFromCart: jest.fn(() => ({ data: { order: { cart: { id: 'xxx', version: 3 } } }})),
  createCart: jest.fn(() => ({ data: { cart: 'some-cart' }})),
  cartActions: {
    setShippingMethodAction: jest.fn(() => 'setShippingMethodAction'),
    setShippingAddressAction: jest.fn(() => 'setShippingAddressAction'),
    setBillingAddressAction: jest.fn(() => 'setBillingAddressAction'),
    setCustomerEmail: jest.fn(() => 'setCustomerEmail')
  }
}));

import createSetBillingDetails from './../../src/useCheckout/createSetBillingDetails';
import createSetShippingDetails from './../../src/useCheckout/createSetShippingDetails';
import createSetShippingMethod from './../../src/useCheckout/createSetShippingMethod';
import createLoadShippingMethods from './../../src/useCheckout/createLoadShippingMethods';
import createLoadPaymentMethods from './../../src/useCheckout/createLoadPaymentMethods';
import createSetPersonalDetails from './../../src/useCheckout/createSetPersonalDetails';
import createSetPaymentMethod from './../../src/useCheckout/createSetPaymentMethod';
import createPlaceOrder from './../../src/useCheckout/createPlaceOrder';
import createLoadDetails from './../../src/useCheckout/createLoadDetails';
import { updateCart, getShippingMethods, createMyOrderFromCart } from '@vue-storefront/shopify-api';
import initFields from './../../src/useCheckout/initFields';

describe('[commercetools-composables] useCheckout/setShippingDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFields();
  });

  it('set shipping details', async () => {
    const setShippingDetails = createSetShippingDetails({ factoryParams: {}, cartFields, setCart });
    const shippingAddress = { firstName: 'John', lastName: 'Doe' };
    await setShippingDetails(shippingAddress);

    expect(shippingDetails.value).toEqual({ ...shippingAddress, contactInfo: {} });
    expect(loading.value.shippingAddress).toBe(false);
  });

  it('overwrites contactInfo properly', async () => {
    (shippingDetails.value as any).contactInfo = { email: 'test@test.com' };
    const setShippingDetails = createSetShippingDetails({ factoryParams: {}, cartFields, setCart });
    const shippingAddress = { firstName: 'John', lastName: 'Doe', contactInfo: { phone: '123456789' } };
    await setShippingDetails(shippingAddress);

    expect(shippingDetails.value).toEqual({ ...shippingAddress, contactInfo: { phone: '123456789', email: 'test@test.com' } });
    expect(loading.value.shippingAddress).toBe(false);
  });

  it('send shipping details to the api', async () => {
    const setShippingDetails = createSetShippingDetails({ factoryParams: {}, cartFields, setCart });
    const shippingAddress = { firstName: 'John', lastName: 'Doe' };
    await setShippingDetails(shippingAddress, { save: true });

    expect(shippingDetails.value).toEqual({ ...shippingAddress, contactInfo: {} });
    expect(updateCart).toHaveBeenCalledWith({
      actions: [
        'setShippingMethodAction',
        'setShippingAddressAction'
      ],
      id: 'cart-id',
      version: 1
    }, undefined);
    expect(initFields).toHaveBeenCalledWith({ id: 'new-cart-id' });
    expect(loading.value.shippingAddress).toBe(false);
  });

  it('fails when updateCart throws', async () => {
    (updateCart as jest.Mock).mockImplementationOnce(() => {
      throw 'error';
    });
    const setShippingDetails = createSetShippingDetails({ factoryParams: {}, cartFields, setCart });
    const shippingAddress = { firstName: 'John', lastName: 'Doe' };
    try {
      await setShippingDetails(shippingAddress, { save: true });
      fail();
    } catch {
      expect(shippingDetails.value).toEqual({ ...shippingAddress, contactInfo: {} });
      expect(updateCart).toHaveBeenCalledWith({
        actions: [
          'setShippingMethodAction',
          'setShippingAddressAction'
        ],
        id: 'cart-id',
        version: 1
      }, undefined);
      expect(initFields).not.toBeCalled();
      expect(loading.value.shippingAddress).toBe(false);
    }
  });
});

describe('[commercetools-composables] useCheckout/setBillingDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFields();
  });

  it('set billing details', async () => {
    const setBillingDetails = createSetBillingDetails({ factoryParams: {}, cartFields, setCart });
    const billingAddress = { firstName: 'John', lastName: 'Doe' };
    await setBillingDetails(billingAddress);

    expect(billingDetails.value).toEqual({ ...billingAddress, contactInfo: {} });
    expect(loading.value.billingAddress).toBe(false);
  });

  it('send billing details to the API', async () => {
    const setBillingDetails = createSetBillingDetails({ factoryParams: {}, cartFields, setCart });
    const billingAddress = { firstName: 'John', lastName: 'Doe' };
    await setBillingDetails(billingAddress, { save: true });

    expect(billingDetails.value).toEqual({ ...billingAddress, contactInfo: {} });
    expect(updateCart).toHaveBeenCalledWith({
      actions: [
        'setBillingAddressAction'
      ],
      id: 'cart-id',
      version: 1
    }, undefined);
    expect(initFields).toHaveBeenCalledWith({ id: 'new-cart-id' });
    expect(loading.value.billingAddress).toBe(false);
  });

  it('fails when updateCart throws', async () => {
    (updateCart as jest.Mock).mockImplementationOnce(() => {
      throw 'error';
    });
    const setBillingDetails = createSetBillingDetails({ factoryParams: {}, cartFields, setCart });
    const billingAddress = { firstName: 'John', lastName: 'Doe' };
    try {
      await setBillingDetails(billingAddress, { save: true });
      fail();
    } catch {
      expect(billingDetails.value).toEqual({ ...billingAddress, contactInfo: {} });
      expect(updateCart).toHaveBeenCalledWith({
        actions: [
          'setBillingAddressAction'
        ],
        id: 'cart-id',
        version: 1
      }, undefined);
      expect(initFields).not.toBeCalled();
      expect(loading.value.billingAddress).toBe(false);
    }
  });
});

describe('[commercetools-composables] useCheckout/loadDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFields();
  });

  it('loads details', async () => {
    const loadDetails = createLoadDetails({ factoryParams: {}, cartFields });
    await loadDetails();
    expect(initFields).toBeCalled();
  });
});

describe('[commercetools-composables] useCheckout/loadPaymentMethods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFields();
  });

  it('loads payment methods', async () => {
    const loadPaymentMethods = createLoadPaymentMethods({ factoryParams: {} });
    await loadPaymentMethods();
    expect(paymentMethods.value).not.toEqual([]);
    expect(chosenPaymentMethod.value).not.toEqual({});
  });
});

describe('[commercetools-composables] useCheckout/loadShippingMethods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFields();
  });

  it('skip loading when shipping address is not completed', async () => {
    isShippingAddressCompleted.value = false;
    const setShippingMethod = jest.fn();
    const loadShippingMethods = createLoadShippingMethods({ factoryParams: {}, setShippingMethod, cartFields });
    await loadShippingMethods();

    expect(getShippingMethods).not.toBeCalled();
    expect(setShippingMethod).not.toBeCalled();
    expect(loading.value.shippingMethods).toBe(false);
  });

  it('loads shipping methods with empty list', async () => {
    (getShippingMethods as any).mockReturnValueOnce({ data: { shippingMethods: [] } });
    const setShippingMethod = jest.fn();
    const loadShippingMethods = createLoadShippingMethods({ factoryParams: {}, setShippingMethod, cartFields });
    await loadShippingMethods();

    expect(getShippingMethods).toBeCalled();
    expect(shippingMethods.value).toEqual([]);
    expect(chosenShippingMethod.value).toEqual({});
    expect(setShippingMethod).not.toBeCalled();
    expect(loading.value.shippingMethods).toBe(false);
  });

  it('selects shipping method from the cart', async () => {
    (getShippingMethods as any).mockReturnValueOnce({ data: { shippingMethods: [] } });
    cart.value = {
      ...cart.value,
      shippingInfo: { shippingMethod: { method: 'cart' } }
    } as any;
    const setShippingMethod = jest.fn();
    const loadShippingMethods = createLoadShippingMethods({ factoryParams: {}, setShippingMethod, cartFields });
    await loadShippingMethods();

    expect(getShippingMethods).toBeCalled();
    expect(shippingMethods.value).toEqual([]);
    expect(chosenShippingMethod.value).toEqual({ });
    expect(setShippingMethod).not.toBeCalled();
    expect(loading.value.shippingMethods).toBe(false);
  });

  it('fails when getShippingMethods throws', async () => {
    (getShippingMethods as any).mockImplementationOnce(() => {
      throw 'error';
    });
    cart.value = {
      ...cart.value,
      shippingInfo: { shippingMethod: { method: 'cart' } }
    } as any;
    const setShippingMethod = jest.fn();
    const loadShippingMethods = createLoadShippingMethods({ factoryParams: {}, setShippingMethod, cartFields });
    try {
      await loadShippingMethods();
      fail();
    } catch {
      expect(getShippingMethods).toBeCalled();
      expect(shippingMethods.value).toEqual([]);
      expect(chosenShippingMethod.value).toEqual({ });
      expect(setShippingMethod).not.toBeCalled();
      expect(loading.value.shippingMethods).toBe(false);
    }
  });
});

describe('[commercetools-composables] useCheckout/placeOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFields();
  });

  it('places order', async () => {
    const placeOrder = createPlaceOrder({ cartFields });
    await placeOrder();

    expect(createMyOrderFromCart).toBeCalled();
    expect(loading.value.order).toBe(false);
  });

  it('fails when createMyOrderFromCart throws', async () => {
    (createMyOrderFromCart as jest.Mock).mockImplementationOnce(() => {
      throw 'error';
    });
    const placeOrder = createPlaceOrder({ cartFields });
    try {
      await placeOrder();
      fail();
    } catch {
      expect(createMyOrderFromCart).toBeCalled();
      expect(loading.value.order).toBe(false);
    }
  });
});

describe('[commercetools-composables] useCheckout/setPaymentMethod', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFields();
  });

  it('set payment method', async () => {
    const setPaymentMethod = createSetPaymentMethod({ factoryParams: {} });
    await setPaymentMethod('some-payment-method', {});
    expect(chosenPaymentMethod.value).toEqual('some-payment-method');

    await setPaymentMethod('some-payment-method');
    expect(chosenPaymentMethod.value).toEqual('some-payment-method');
  });
});

describe('[commercetools-composables] useCheckout/setPersonalDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFields();
  });

  it('set personal details', async () => {
    const setShippingDetails = jest.fn();
    const setPersonalDetails = createSetPersonalDetails({ factoryParams: {}, setShippingDetails, cartFields, setCart });
    const data = { firstName: 'John', lastName: 'Doe' };
    await setPersonalDetails(data);

    expect(personalDetails.value).toEqual(data);
    expect(updateCart).not.toBeCalled();
    expect(setShippingDetails).not.toBeCalled();
    expect(loading.value.personalDetails).toBe(false);
  });

  it('set personal details and send it to the API', async () => {
    const setShippingDetails = jest.fn();
    const setPersonalDetails = createSetPersonalDetails({ factoryParams: {}, setShippingDetails, cartFields, setCart });
    const data = { firstName: 'John', lastName: 'Doe' };
    await setPersonalDetails(data, { save: true });

    expect(personalDetails.value).toEqual(data);
    expect(updateCart).toHaveBeenCalledWith({
      actions: ['setCustomerEmail'],
      id: 'cart-id',
      version: 1
    }, undefined);
    expect(setShippingDetails).toBeCalled();
    expect(initFields).toBeCalled();
    expect(loading.value.personalDetails).toBe(false);
  });

  it('fails when updateCart throws', async () => {
    (updateCart as jest.Mock).mockImplementationOnce(() => {
      throw 'error';
    });
    const setShippingDetails = jest.fn();
    const setPersonalDetails = createSetPersonalDetails({ factoryParams: {}, setShippingDetails, cartFields, setCart });
    const data = { firstName: 'John', lastName: 'Doe' };
    try {
      await setPersonalDetails(data, { save: true });
      fail();
    } catch {
      expect(personalDetails.value).toEqual(data);
      expect(updateCart).toHaveBeenCalledWith({
        actions: ['setCustomerEmail'],
        id: 'cart-id',
        version: 1
      }, undefined);
      expect(setShippingDetails).not.toBeCalled();
      expect(initFields).not.toBeCalled();
      expect(loading.value.personalDetails).toBe(false);
    }
  });
});

describe('[commercetools-composables] useCheckout/setShippingMethod', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFields();
  });

  it('set shipping method', async () => {
    const setShippingMethod = createSetShippingMethod({ factoryParams: {}, cartFields, setCart });
    const method = { name: 'method1', id: 1};
    await setShippingMethod(method);

    expect(chosenShippingMethod.value).toEqual(method);
    expect(updateCart).not.toBeCalled();
    expect(loading.value.shippingMethod).toBe(false);
  });

  it('set shipping method and send it to the API', async () => {
    const setShippingMethod = createSetShippingMethod({ factoryParams: {}, cartFields, setCart });
    const method = { name: 'method1', id: 1};
    await setShippingMethod(method, { save: true });

    expect(chosenShippingMethod.value).toEqual(method);
    expect(updateCart).toHaveBeenCalledWith({
      actions: ['setShippingMethodAction'],
      id: 'cart-id',
      version: 1
    }, undefined);
    expect(initFields).toBeCalled();
    expect(loading.value.shippingMethod).toBe(false);
  });

  it('fails when updateCart throws', async () => {
    (updateCart as jest.Mock).mockImplementationOnce(() => {
      throw 'error';
    });
    const setShippingMethod = createSetShippingMethod({ factoryParams: {}, cartFields, setCart });
    const method = { name: 'method1', id: 1};
    try {
      await setShippingMethod(method, { save: true });
      fail();
    } catch {
      expect(chosenShippingMethod.value).toEqual(method);
      expect(updateCart).toHaveBeenCalledWith({
        actions: ['setShippingMethodAction'],
        id: 'cart-id',
        version: 1
      }, undefined);
      expect(initFields).not.toBeCalled();
      expect(loading.value.shippingMethod).toBe(false);
    }
  });
});

describe('[commercetools-composables] useCheckout/initFields', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFields();
  });

  it('inits checkout state', () => {
    const unMockedInitFields = require.requireActual('./../../src/useCheckout/initFields').default;

    unMockedInitFields({
      customerEmail: 'john@doe.com',
      shippingAddress: { address: 'shipping address' },
      billingAddress: { address: 'billing address' },
      shippingInfo: { shippingMethod: 'dhl' }
    });

    expect(personalDetails.value).toEqual({ email: 'john@doe.com' });
    expect(shippingDetails.value).toEqual({ address: 'shipping address' });
    expect(billingDetails.value).toEqual({ address: 'billing address' });
    expect(isShippingAddressCompleted.value).toEqual(true);
    expect(isBillingAddressCompleted.value).toEqual(true);
    expect(isPersonalDetailsCompleted.value).toEqual(true);
    expect(chosenShippingMethod.value).toEqual('dhl');
  });

  it('inits empty billing details and shipping method', () => {
    const unMockedInitFields = require.requireActual('./../../src/useCheckout/initFields').default;

    unMockedInitFields({
      customerEmail: 'john@doe.com',
      shippingAddress: { address: 'shipping address' },
      billingAddress: null,
      shippingInfo: null
    });

    expect(billingDetails.value).toEqual({});
    expect(chosenShippingMethod.value).toEqual({});
  });
});
