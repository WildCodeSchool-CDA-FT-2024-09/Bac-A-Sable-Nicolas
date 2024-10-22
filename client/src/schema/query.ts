import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query GetRepos {
    getRepos {
      id
      name
      url
      status {
        id
        name
      }
      languages {
        id
        name
      }
    }
  }
`