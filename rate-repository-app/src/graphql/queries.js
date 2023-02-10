import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
query Repositories($first: Int, $after: String, $searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(first: $first, after: $after, searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
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
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          ...ReviewDetails
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
}
${REVIEW_DETAILS}
`;

export const GET_REPOSITORY = gql`
query ($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    id
    createdAt
    description
    forksCount
    fullName
    language
    name
    openIssuesCount
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    watchersCount
    url
    userHasReviewed
    reviews(first: $first, after: $after) {
      totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...ReviewDetails
        }
      }
    }
  }
}
${REVIEW_DETAILS}
`;