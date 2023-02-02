import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

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

export default useRepositories;