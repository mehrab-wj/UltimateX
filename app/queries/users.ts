import { gql } from "@apollo/client/index";


export const CREATE_GUEST_TOKEN_QUERY = gql`
query GetTokens($networkDomain: String!) {
  tokens(networkDomain: $networkDomain) {
    accessToken
    role {
      name
      scopes
    }
    member {
      id
      name
    }
  }
}
`;

// export const LOGIN_USER_QUERY = gql``;

// export const REGISTER_USER_QUERY = gql``;