import { gql } from "@apollo/client/core";

export const GetBlogsQuery = gql`
    query getBlogs(
      $after: String
      $before: String
      $first: Int
      $last: Int
      $query: String
      $reverse: Boolean
      $sortKey: BlogSortKeys
    ) {
        blogs(after: $after, before: $before, first: $first, last: $last, query: $query, reverse: $reverse, sortKey: $sortKey) {
          edges {
            node {
              id
              handle
              title
              authors {
                bio
                email
                firstName
                lastName
                name
              }
              onlineStoreUrl
              seo {
                description
                title
              }
            }
          }
        }
    }
`