import { SP_TOKEN_COOKIE_NAME } from '@vue-storefront/shopify/nuxt/helpers';
import { integrationPlugin } from '@vue-storefront/shopify';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export default integrationPlugin(({ app, integration }) => {
  const onTokenChange = (newToken) => {
    try {
      const currentToken = app.$cookies.get(SP_TOKEN_COOKIE_NAME);

      if (!currentToken || currentToken.access_token !== newToken.access_token) {
        app.$cookies.set(SP_TOKEN_COOKIE_NAME, newToken);
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(SP_TOKEN_COOKIE_NAME);
  };

  const onTokenRead = () => {
    return app.$cookies.get(SP_TOKEN_COOKIE_NAME);
  };

  integration.configure({
    ...moduleOptions,
    app,
    additionalProperties: {
      auth: {
        onTokenChange,
        onTokenRead,
        onTokenRemove
      }
    }
    // other options
  });
});
