import { Context } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const loadCurrentCart = async (context: Context, customQueryFn = (user = null, cart = null) => ({ cart, user })) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, cart } = customQueryFn();

  /*
  const { data: profileData } = await context.$shopify.api.getMe({ customer: false }, user);
  if (profileData.me.activeCart) {
    return profileData.me.activeCart;
  }
  */
  const { data } = await context.$shopify.api.createCart({}, cart);

  return data.cart;
};

export default loadCurrentCart;
