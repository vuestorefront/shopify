import { QueryRootPageArgs, QueryRootBlogsArgs, QueryRootBlogArgs } from "@vue-storefront/shopify-apollo/src/shopify";
import { ContentType } from "./ContentType";

export interface BaseUseContentParams {
  contentType: ContentType
}

export type UseContentParams = BaseUseContentParams & (QueryRootBlogArgs | QueryRootBlogsArgs | QueryRootPageArgs)