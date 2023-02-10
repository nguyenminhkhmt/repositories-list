import { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import { useDebounce } from 'use-debounce';

const RepositoryList = ({ navigateRepo }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [debounceQuery] = useDebounce(searchKeyword, 500);

  const params = {
    first: 5,
    searchKeyword: debounceQuery,
    orderBy,
    orderDirection
  }
  const { repositories, loading, fetchMore } = useRepositories(params);

  const onEndReached = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigateRepo={navigateRepo}
      onEndReached={onEndReached} 
      loading={loading}
      searchKeyword={searchKeyword}
      orderBy={orderBy}
      orderDirection={orderDirection}
      setSearchKeyword={setSearchKeyword}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
    />
  );
};

export default RepositoryList;