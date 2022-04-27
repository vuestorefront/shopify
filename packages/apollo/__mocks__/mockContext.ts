

export function createMockContext() {
  const query = jest.fn()

  const apolloClient = { query }
  
  const extendQuery = jest.fn();
  
  const context: any = {
    extendQuery,
    client: {
      apolloClient
    }
  }

  return {
    query, apolloClient, extendQuery, context
  }
}

