import { QueryResult } from '@vue-storefront/shopify-api/server/next'
import searchGetters from '../../src/getters/searchGetters'
import { SearchResultMock } from '../../__mocks__'

describe('[shopify-composables] search getters', () => {
  it('getItems should return search items', () => {
    expect(
      searchGetters
        .getItems(SearchResultMock as QueryResult)
        .map(item => item.id)
    )
      .toEqual(
        // Must be the 2 items mock Shopify ID provided in the SearchResultMock
        ['Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzUzMjc1NTA2MTE2MTY=', 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzUzMjg4ODg0MzA3NTI=']
      )
  })
})