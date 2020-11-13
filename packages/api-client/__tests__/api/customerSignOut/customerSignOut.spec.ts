import customerSignOut from './../../../src/api/customerSignOut';
import { getSettings } from './../../../src/index';

describe('[shopify-api-client] customerSignOut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('clears user session', async () => {
    await customerSignOut();
    const { auth } = getSettings();
    expect(auth.onTokenRemove).toBeCalled();
  });
});
