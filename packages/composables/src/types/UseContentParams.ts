import { QueryRootPageArgs, QueryRootBlogsArgs, QueryRootBlogArgs } from "@vue-storefront/shopify-apollo/src/shopify";
import { GetArticlesParams } from "@vue-storefront/shopify-apollo/src/types/GetArticlesParams";
import { ContentType } from "./ContentType";

export interface BaseUseContentParams {
  contentType: ContentType
}

export type UseContentParams = BaseUseContentParams & (QueryRootBlogArgs | QueryRootBlogsArgs | QueryRootPageArgs | GetArticlesParams)