import { createCart, getMe } from '@vue-storefront/shopify-api';

const loadCurrentCart = async (customQueryFn = (user = null, cart = null) => ({ cart, user })) => {
  const { user, cart } = customQueryFn();
  const { data: profileData } = await getMe({ customer: false }, user);

  if (profileData.me.activeCart) {
    return profileData.me.activeCart;
  }

  const { data } = await createCart({}, cart);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(data);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  return data.cart;
};

export default loadCurrentCart;
