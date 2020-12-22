import addToCart from './../../../src/api/addToCart';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[shopify-api-client] addToCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('adds product to the cart', async () => {
    const product = { id: 1,
      sku: '123' } as any;

    const response = await addToCart(cart, product, 2);

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          addLineItem: {
            variantId: 1,
            sku: '123',
            quantity: 2
          }
        }
      ]
    });
  });
});
