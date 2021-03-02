import { isAnonymousSession, isUserSession } from '../../helpers/utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const isGuest = (context) => {
  const { client, config } = context;
  if (config.handleIsGuest) {
    return config.handleIsGuest(context);
  }

  if (client.tokenProvider || context.isProxy) {
    const token = config.auth.onTokenRead();
    return !isAnonymousSession(token) && !isUserSession(token);
  }

  return false;
};

export default isGuest;
