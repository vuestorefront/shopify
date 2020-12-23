import { createCart, getMe } from '@vue-storefront/shopify-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const loadCurrentCart = async (customQueryFn = (user = null, cart = null) => ({ cart, user })) => {
  const { user } = customQueryFn();
  const { data: profileData } = await getMe({ customer: false }, user);

  if (profileData.me.activeCart) {
    return profileData.me.activeCart;
  }

  const {data} = await createCart();
  return data.cart;
};

export default loadCurrentCart;
