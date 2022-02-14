import { contextMock } from '../__mocks__/contextMock.spec'
import getPage from '../src/api/getPage'

contextMock.client.apolloClient.query.mockImplementation((payload) => Promise.resolve(payload))

describe('[shopify-apollo] get page', () => {
  it('id, handle props correctly mapped', async () => {
    const params = { handle: 'who-we-are', id: 'id' }

    const mockResponse: { variables: string } = await getPage(contextMock, params) as any

    expect(mockResponse.variables).toEqual(params)
  })
})