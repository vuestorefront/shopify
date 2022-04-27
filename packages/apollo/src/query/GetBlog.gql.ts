import { gql } from "@apollo/client/core";

export const GetBlogQuery = gql`
query getBlog(
  $handle: String
  $id: ID
) {
  blog(handle: $handle, id: $id) {
    id
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
`