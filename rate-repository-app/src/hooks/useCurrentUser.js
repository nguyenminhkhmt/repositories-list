import { GET_ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useCurrentUser = (variables) => {
  const { data, loading, error, fetchMore, ...result } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me?.reviews?.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        ...variables,
        after: data?.me?.reviews?.pageInfo.endCursor,
      },
    });
  };

  return {
    currentUser: data?.me,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useCurrentUser;