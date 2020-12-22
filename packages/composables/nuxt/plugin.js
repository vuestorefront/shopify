/* eslint-disable */
import { setup } from '@vue-storefront/shopify-api';
import { mapConfigToSetupObject, CT_TOKEN_COOKIE_NAME } from '@vue-storefront/shopify/nuxt/helpers'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

<% if (!options.disableGenerateTokenMiddleware) { %>
import Middleware from './middleware'
import ctTokenMiddleware from '@vue-storefront/shopify/nuxt/token-middleware'
import { CT_TOKEN_MIDDLEWARE_SLUG } from '@vue-storefront/shopify/nuxt/helpers'
Middleware[CT_TOKEN_MIDDLEWARE_SLUG] = ctTokenMiddleware(moduleOptions);
<% } %>

export default ({ app }) => {
  const currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);

  const onTokenChange = (token) => {
    try {
      if (!process.server) {
        app.$cookies.set(CT_TOKEN_COOKIE_NAME, token);
        setup({ currentToken: token });
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(CT_TOKEN_COOKIE_NAME);
    setup({ currentToken: null, forceToken: true });
  };

  setup(
    mapConfigToSetupObject({
      moduleOptions,
      app,
      additionalProperties: {
        currentToken,
        auth: {
          onTokenChange,
          onTokenRemove
        }
      }
    })
  )
};
