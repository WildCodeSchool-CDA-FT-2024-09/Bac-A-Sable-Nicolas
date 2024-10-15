import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query getRepos {
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