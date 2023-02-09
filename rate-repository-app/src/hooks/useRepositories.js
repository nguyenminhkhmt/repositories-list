import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY, SEARCH_REPOSITORY } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  if (!data) {
    return { loading, error, refetch }
  }
  const repositories = data.repositories;
  return { repositories, loading, error, refetch };
};

export const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      repositoryId: id
    }
  });

  if (loading || error) {
    return { loading, error };
  }

  const repository = data.repository;
  return { repository, loading };
};

export const useSearchRepo = (keyword) => {
  const { data, loading, error } = useQuery(SEARCH_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      searchKeyword: keyword
    }
  });

  if (loading || error) {
    return { loading, error };
  }

  const searchData = data.repositories;
  return { searchData, loading };
}

export default useRepositories;