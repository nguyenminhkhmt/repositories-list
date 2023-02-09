import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = ({ navigateRepo }) => {
  const { repositories } = useRepositories();

  return (
    <RepositoryListContainer repositories={repositories} navigateRepo={navigateRepo} />
  );
};

export default RepositoryList;