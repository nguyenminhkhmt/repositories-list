import { gql } from '@apollo/client';

export const USER_DETAILS = gql`
fragment UserDetails on User {
  id
  username
}
`;

export const REVIEW_DETAILS = gql`
fragment ReviewDetails on Review {
  id
  text
  rating
  createdAt
  repositoryId
  user {
    ...UserDetails
  }
}
${USER_DETAILS}
`;

export const REPOSITORY_DETAILS = gql`
fragment RepositoryDetails on Repository {
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
  reviews {
    edges {
      node {
        ...ReviewDetails
      }
    }
  }
}
${REVIEW_DETAILS}
`;