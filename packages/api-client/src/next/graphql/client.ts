import { MiddlewareSettingsConfig } from "../types";

interface QueryGraphqlParams {
    query: string
    variables: Record<string, unknown>
}

export function client(settings: MiddlewareSettingsConfig) {
    return (params: QueryGraphqlParams) =>
        fetch(`https://${settings.api.domain}/api/2021-10/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Shopify-Storefront-Access-Token': settings.api.storefrontAccessToken
            },
            body: JSON.stringify(params)
        })
        .then(r => r.json())
        .catch(e => console.error(e))
}