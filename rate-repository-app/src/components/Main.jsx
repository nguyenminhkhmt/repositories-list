import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, useNavigate } from 'react-router-native';
import SignIn from './SignIn';
import useSignIn from '../hooks/useSignIn';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const onSignIn = async (values) => {
    try {
      const { data } = await signIn(values);
      if (data) {
        const token = data.authenticate.accessToken;
        await authStorage.setAccessToken(token);
        apolloClient.resetStore();
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <AppBar handleSignOut={onSignOut} />
      <Routes>
        <Route path="/repositories" element={<RepositoryList />} exact />
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn onSubmit={onSignIn} />} />
      </Routes>
    </View>
  );
};

export default Main;