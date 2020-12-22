import customerSignMeUp from '../../../src/api/customerSignMeUp';
import { apolloClient, getSettings } from '../../../src/index';
import defaultMutation from '../../../src/api/customerSignMeUp/defaultMutation';
import createAccessToken from '../../../src/helpers/createAccessToken';

describe('[shopify-api-client] customerSignMeUp', () => {

  it('creates user account', async () => {
    const givenVariables = {
      draft: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: 'xxxxx'
      },
      acceptLanguage: ['en', 'de'],
      locale: 'en'
    };

    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);

      return { data: 'user response' };
    });

    const { data } = await customerSignMeUp(givenVariables.draft);
    const { auth } = getSettings();
    expect(createAccessToken).toBeCalled();
    expect(auth.onTokenChange).toBeCalled();
    expect(data).toBe('user response');
  });
});
