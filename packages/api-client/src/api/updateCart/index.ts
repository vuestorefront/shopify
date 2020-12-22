import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL';
import { getSettings } from '../../index';
import { CustomQueryFn } from './../../types/Api';
import defaultQuery from './defaultMutation';
import gql from 'graphql-tag';
import { getCustomQuery } from './../../helpers/queries';

interface UpdateCart {
  id: string;
  version: number;
  actions: CartUpdateAction[] | MyCartUpdateAction[];
}

const updateCart = async (params: UpdateCart, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage, client } = getSettings();
  const defaultVariables = params
    ? {
      locale,
      acceptLanguage,
      ...params
    }
    : { acceptLanguage };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default updateCart;
