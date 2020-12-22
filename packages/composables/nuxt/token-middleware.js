import { setup, createAccessToken } from '@vue-storefront/shopify-api';
import { mapConfigToSetupObject, CT_TOKEN_COOKIE_NAME } from '@vue-storefront/shopify/nuxt/helpers';

export default moduleOptions => async ({ app }) => {
  if (!process.server) return;

  const newToken = await createAccessToken();
  app.$cookies.set(CT_TOKEN_COOKIE_NAME, newToken);
  setup(mapConfigToSetupObject({ moduleOptions, app }));
};
