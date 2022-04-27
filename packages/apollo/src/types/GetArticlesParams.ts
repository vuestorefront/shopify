import { QueryRootArticlesArgs } from "../shopify";

export interface GetArticlesParams extends QueryRootArticlesArgs {
  truncateContent?: number
}