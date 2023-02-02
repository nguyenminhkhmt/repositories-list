import { GET_ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useCurrentUser = () => {
  const { data, loading, error, refetch } = useQuery(GET_ME);
  if (!data) {
    return { loading, error, refetch }
  }
  const currentUser = data.me;
  return { currentUser, loading, error, refetch };
};

export default useCurrentUser;