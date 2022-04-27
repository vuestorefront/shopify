/* istanbul ignore file */

import { UserGetters} from '@vue-storefront/core';
import { User } from '../types';

export const getUserFirstName = (user: User): string => {
  if (user) {
    return user?.firstName || '';
  }
  return '';
};

export const getUserLastName = (user: User): string =>{
  if (user) {
    return user?.lastName || '';
  }
  return '';
};

export const getUserFullName = (user: User): string => user ? `${user.firstName} ${user.lastName}` : '';

export const getUserEmailAddress = (user: User): string => user?.email || '';
export const getAcceptsMarketingStatus = (user: User): boolean => {
  if (user) {
    return user?.acceptsMarketing || false;
  }
  return false;
};

export const getUserCleanId = (user: User): string => {
  if (user && user.id) {
    const buff = Buffer.from(user.id, 'base64');
    const decodedId = buff.toString('ascii');
    const extractedInfo = decodedId.split(/[\s/]+/).pop();
    return extractedInfo;
  }
  return '';
};

export const getUserToken = (user: User): string => user?.token || '';
export const getUserTags = (user: User): string => {
  if (user && user.tags && user.tags.length > 0) {
    const tagsList = (user?.tags).map((tag) => {
      return tag.value;
    });
    return JSON.stringify(tagsList) || '';
  }
  return '';
};

export const getUserPhone = (user: User): string => user?.phone || '';

export const getUserdisplayName = (user: User): string => user?.displayName || '';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getUserdefaultAddress = (user: User) => {
  return user?.defaultAddress || '';
};

const userGetters: UserGetters<User> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName,
  getEmailAddress: getUserEmailAddress,
  getdisplayName: getUserdisplayName,
  getPhone: getUserPhone,
  getdefaultAddress: getUserdefaultAddress,
  getTags: getUserTags,
  getToken: getUserToken,
  getCleanID: getUserCleanId,
  AcceptsMarketingStatus: getAcceptsMarketingStatus
};

export default userGetters;
