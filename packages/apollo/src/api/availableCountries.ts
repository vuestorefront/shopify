import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot } from '../shopify'

export async function availableCountries(context: ShopifyApolloContext, customQuery?: CustomQuery) {
  const localizationQuery = gql`
  query getLocalization {
    localization {
      availableCountries {
        name
        isoCode
        currency {
          isoCode
          name
          symbol
        }
      }
    }
  }
`

  const { availableCountries } = context.extendQuery(
    customQuery,
    {
      availableCountries: {
        query: localizationQuery,
        variables: {}
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot>({
    query: availableCountries.query
  })

  return response?.data?.localization?.availableCountries ?? []
}