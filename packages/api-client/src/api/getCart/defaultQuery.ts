import gql from 'graphql-tag';
import { CartFragment } from './../../fragments';

export default gql`
  ${CartFragment}

  query getCart($cartId: String!, $locale: Locale!, $acceptLanguage: [Locale!]) {
    cart(id: $cartId) {
      ...DefaultCart
    }
  }
`;
