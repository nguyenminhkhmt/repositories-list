import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Navigate, Route, Routes, useMatch, useNavigate } from 'react-router-native';
import SignIn from './SignIn';
import useSignIn from '../hooks/useSignIn';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import useCreateReview, { useDeleteReview } from '../hooks/useCreateReview';
import SignUp from './SignUp';
import useSignUp from '../hooks/useSignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const [signIn] = useSignIn();
  const [createReview] = useCreateReview();
  const [deleteReview] = useDeleteReview();
  const [signUp] = useSignUp();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const repositoryMatch = useMatch('repositories/:id');
  const repositoryId = repositoryMatch ? repositoryMatch.params.id : null;

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

  const navigateRepo = (id) => {
    navigate(`/repositories/${id}`);
  };

  const onDeleteReview = (id) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => { },
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deleteReview(id) },
    ]);
  }

  const onCreateReview = async (values) => {
    try {
      const { data } = await createReview({ ...values, rating: Number(values.rating) });
      if (data) {
        console.log(data);
        const repositoryId = data.createReview.repositoryId;
        navigateRepo(repositoryId);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSignUp = async (values) => {
    try {
      const { data } = await signUp(values);
      if (data) {
        console.log(data);
        navigate('/signin');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <AppBar handleSignOut={onSignOut} />
        <Routes>
          <Route path="/repositories" element={<RepositoryList navigateRepo={navigateRepo} />} exact />
          <Route path="/" element={<RepositoryList navigateRepo={navigateRepo} />} exact />
          <Route path="/signin" element={<SignIn onSubmit={onSignIn} />} />
          <Route path='/repositories/:id' element={
            repositoryId ? <SingleRepository repositoryId={repositoryId} /> : <Navigate replace to="/" />
          } />
          <Route path='/create-review' element={<CreateReview onSubmit={onCreateReview} />} />
          <Route path='/signup' element={<SignUp onSubmit={onSignUp} />} />
          <Route path='/my-reviews' element={<MyReviews navigateRepo={navigateRepo} deleteReview={onDeleteReview} />} />
        </Routes>
      </View>
    </SafeAreaView>
  );
};

export default Main;