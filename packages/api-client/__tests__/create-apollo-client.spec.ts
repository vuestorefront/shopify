
import { createApiClient } from '../src/index.server'

(global as any).fetch = jest.fn();

const mockSettings = {
    api: {
        domain: '',
        storefrontAccessToken: ''
    }
}

describe('[shopify-api-client] apollo client', () => {
    it('creates graphql apollo client', () => {
        const instance = createApiClient(mockSettings) as any

        expect(instance.client.apolloClient?.query).toBeInstanceOf(Function)
    })
})