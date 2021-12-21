import { gql } from '@apollo/client';
import { CartFragment } from './../../fragments';

export default gql`
  ${CartFragment}
  mutation createCart($draft: MyCartDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {
    cart: createMyCart(draft: $draft, storeKey: $storeKey) {
      ...DefaultCart
    }
  }
`;
