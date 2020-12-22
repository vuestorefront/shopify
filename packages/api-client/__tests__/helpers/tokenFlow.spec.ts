/* eslint-disable camelcase, @typescript-eslint/camelcase */
import * as sdk from '@commercetools/sdk-auth';
import { isTokenUserSession, isTokenActive } from './../../src/helpers/token';
import createAccessToken from './../../src/helpers/createAccessToken';
import { setup } from './../../src/index';

jest.unmock('./../../src/helpers/createAccessToken');

const accessTokenFlowMock = jest.fn(() => ({
  access_token: 'access token',
  refresh_token: 'access refresh token'
}));

const anonymousFlowMock = jest.fn(() => ({
  access_token: 'anonymous token',
  refresh_token: 'anonymous refresh token'
}));

const passwordFlowMock = jest.fn(() => ({
  access_token: 'user token',
  refresh_token: 'user refresh token'
}));

const introspectTokenMock = jest.fn(() => ({
  active: true
}));

jest.mock('./../../src/helpers/token', () => ({
  isTokenUserSession: jest.fn(),
  isTokenActive: jest.fn()
}));

jest.spyOn(sdk, 'TokenProvider').mockImplementation((_, tokenInfo) => ({
  getTokenInfo: () => tokenInfo
}));

jest.spyOn(sdk, 'default').mockImplementation(() => ({
  anonymousFlow: anonymousFlowMock,
  customerPasswordFlow: passwordFlowMock,
  introspectToken: introspectTokenMock,
  clientCredentialsFlow: accessTokenFlowMock
}));

const config = {
  api: {
    uri: 'https://example.com',
    authHost: 'https://example.com',
    projectKey: 'project-key',
    clientId: 'client-id',
    clientSecret: 'secret-id',
    scopes: []
  }
} as any;

describe('[shopify-api-client] tokenFlow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setup(config);
  });

  it('return same token', async () => {
    (isTokenActive as any).mockReturnValue(true);

    const currentToken = {
      access_token: 'bbbbb',
      refresh_token: 'aaaa'
    };
    const token = await createAccessToken({ currentToken } as any);

    expect(token).toEqual(currentToken);
  });

  it('creates access token when there is no token  set', async () => {
    (isTokenActive as any).mockReturnValue(false);
    const token = await createAccessToken();

    expect(token).toEqual({
      access_token: 'access token',
      refresh_token: 'access refresh token'
    });
  });

  it('creates anonymous token when user session is required', async () => {
    (isTokenUserSession as any).mockReturnValue(false);
    (isTokenActive as any).mockReturnValue(false);
    const token = await createAccessToken();

    expect(token).toEqual({
      access_token: 'access token',
      refresh_token: 'access refresh token'
    });
  });

  it('creates anonymous token when token is invalid', async () => {
    (isTokenActive as any).mockReturnValue(false);
    const token = await createAccessToken({ currentToken: null, requireUserSession: true } as any);

    expect(token).toEqual({
      access_token: 'anonymous token',
      refresh_token: 'anonymous refresh token'
    });
  });

  it('creates customer  token', async () => {
    const token = await createAccessToken({
      customerCredentials: {
        username: 'xxxx',
        password: 'xxxxx'
      }
    } as any);

    expect(token).toEqual({
      access_token: 'user token',
      refresh_token: 'user refresh token'
    });
  });

  it('returns same token as in the configuration', async () => {
    (isTokenActive as any).mockReturnValue(true);

    const currentToken = {
      access_token: 'current token',
      refresh_token: 'current refresh token'
    };
    setup({ ...config, currentToken } as any);

    const token = await createAccessToken();

    expect(token).toEqual(currentToken);
  });

  it('returns anonymous token when old one is invalid', async () => {
    introspectTokenMock.mockReturnValue({ active: false });

    const currentToken = {
      access_token: 'current token',
      refresh_token: 'current refresh token',
      scope: ''
    };
    setup({ ...config, currentToken } as any);

    const token = await createAccessToken({ currentToken, requireUserSession: true } as any);

    expect(token).toEqual({
      access_token: 'anonymous token',
      refresh_token: 'anonymous refresh token'
    });
  });
});
