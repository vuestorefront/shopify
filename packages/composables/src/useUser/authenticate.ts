import { Logger } from '@vue-storefront/core';
import { CustomerSignMeInDraft, CustomerSignMeUpDraft } from '../types/graphQL';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const authenticate = async (userData: UserData, fn) => {
  try {
    const userResponse = await fn(userData);
    return userResponse.data.user;
  } catch (err) {
    err.message = err?.graphQLErrors?.[0]?.message || err.message;
    Logger.error('useUser.authenticate', err.message);
    throw err;
  }
};
