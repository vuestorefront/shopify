import { CustomQuery } from '@vue-storefront/core'
import gql from 'graphql-tag'
import { print } from 'graphql'
import { ShopifyIntegrationContext } from '../../types/context'
import { ProductSearchProps } from '../../types/product'

export async function searchProduct(context: ShopifyIntegrationContext, props: ProductSearchProps, customQuery?: CustomQuery) {

    const productsQuery = gql`
        query products($query: String!) {
            products(first:5, query:$query) {
                edges {
                    node {
                        id
                        title
                        description
                    }
                }
            }
        }
    `

    const productsVariables = {
        query: props.query
    }

    const { products } = context.extendQuery(
        customQuery,
        {
            products: {
                query: print(productsQuery),
                variables: productsVariables
            }
        }
    )

    const response = await context.graphqlClient({
        query: products.query,
        variables: products.variables
    })

    return response?.data ?? []
}