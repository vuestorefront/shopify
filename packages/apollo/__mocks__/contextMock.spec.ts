const mockExtendQuery = jest.fn((_, payload) => payload)

export const contextMock = {
  extendQuery: mockExtendQuery,
  client: {
    apolloClient: {
     query: jest.fn()
    }
  }
} as any