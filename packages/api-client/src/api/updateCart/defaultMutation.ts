import { gql } from '@apollo/client';
import { CartFragment } from './../../fragments';

export default gql`
  ${CartFragment}

  mutation updateCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!, $acceptLanguage: [Locale!]) {
    cart: updateMyCart(id: $id, version: $version, actions: $actions) {
      ...DefaultCart
    }
  }
`;
