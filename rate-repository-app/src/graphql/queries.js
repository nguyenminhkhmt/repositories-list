import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
query Repositories {
  repositories {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ...RepositoryDetails
      }
    }
  }
}
${REPOSITORY_DETAILS}
`;

export const GET_ME = gql`
query Me {
  me {
    id
    username
  }
}
`;

export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    ...RepositoryDetails
  }
}
${REPOSITORY_DETAILS}
`;

export const SEARCH_REPOSITORY = gql`
query ($searchKeyword: String) {
  repositories(searchKeyword: $searchKeyword) {
    edges {
      node {
        ...RepositoryDetails
      }
    }
  }
}
${REPOSITORY_DETAILS}
`;