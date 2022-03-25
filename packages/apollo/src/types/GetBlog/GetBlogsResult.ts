import { Blog as ShopifyBlog } from "../../shopify";

interface Blog extends ShopifyBlog {
  link: string
}

export interface GetBlogsResult {
  blogs: Blog[]
}