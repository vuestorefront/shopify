/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function updateNewsLetterPreferences(context, params, _customQuery?: CustomQuery) {
  const { customerId, email, isSubscribed } = params;
  const requestOptions = {
    method: 'PUT'
  };
  return await fetch('https://api.puredailycare.com/api/newsletter?customer_id=' + customerId + '&email=' + email + '&flag=' + isSubscribed, requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        return data.data;
      } else {
        return 'failed';
      }
    });
}
