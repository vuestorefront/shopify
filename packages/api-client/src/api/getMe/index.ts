/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQueryFn } from '../../index';
import { getCustomQuery } from '../../helpers/queries';
import { basicProfile, fullProfile } from './defaultQuery';

export interface GetMeParams {
  customer?: boolean;
}

export interface OrdersData {
  // TODO: When https://github.com/DivanteLtd/vue-storefront/issues/4900 is finished, please change "me: any" to "me: Pick<MeQueryInterface, "activeCart" | "customer">"
  me: any;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getMe = ({ config }, params: GetMeParams = {}, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage } = config;

  const { customer }: GetMeParams = params;
  const defaultQuery = customer ? fullProfile : basicProfile;
  const defaultVariables = {
    locale,
    acceptLanguage
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });
  return {};
};

export default getMe;
