import { CartDraft } from '../../types/GraphQL';
import { getSettings } from '../../index';

interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createCart = async (cartDraft: CartData = {}) => {
  const { spclient } = getSettings();

  const defaultVariables = {
    ...cartDraft
  };

  const request = await spclient.checkout
    .create(defaultVariables)
    .then((checkout) => {
      return checkout;
    });
  return request;
};

export default createCart;
