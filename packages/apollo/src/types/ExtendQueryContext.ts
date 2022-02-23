import { CustomQuery } from "@vue-storefront/core";

interface ExtendQueryParams { query: any; variables: any }

export interface ExtendQueryContext {
  extendQuery: (
    customQuery: CustomQuery,
    query: Record<string, ExtendQueryParams>
  ) => Record<string, ExtendQueryParams>
}