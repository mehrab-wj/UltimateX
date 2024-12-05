import { gql } from '~/api/__generated__/gql';

export const GET_TOP_MEMBERS_QUERY = gql(/* GraphQL */ `
query Members($after: String, $before: String, $filterBy: [MemberListFilterByInput!], $limit: Int!, $offset: Int, $orderBy: String, $query: String, $reverse: Boolean, $roleIds: [ID!], $status: [MemberStatusInput!]) {
  members(
    after: $after
    before: $before
    filterBy: $filterBy
    limit: $limit
    offset: $offset
    orderBy: $orderBy
    query: $query
    reverse: $reverse
    roleIds: $roleIds
    status: $status
  ) {
    totalCount
    edges {
      node {
        displayName
        name
        id
        status
        username
        email
        emailStatus
        newEmail
        tagline
        lastSeenAt
        createdAt
        updatedAt
        relativeUrl
        timeZone
        profilePicture {
          ... on Image {
            __typename
            id
            url
            width
            height
            dominantColorHex
            dpi
            cropHeight
            cropWidth
            cropX
            cropY
            cropZoom
            urls {
              __typename
              full
              large
              medium
              small
              thumb
            }
          }
          ... on File {
            id
            name
            url
          }
        }
      }
    }
  }
}
`);
