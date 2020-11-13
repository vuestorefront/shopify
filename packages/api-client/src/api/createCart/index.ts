import { CartDraft } from '../../types/GraphQL';
import { getSettings } from '../../index';

interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

const createCart = async (cartDraft: CartData = {}, customQueryFn?: CustomQueryFn) => {
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
