import RepositoryItem from "./RepositoryItem";
import { View, Linking, FlatList, StyleSheet } from "react-native";
import PrimaryButton from "./PrimaryButton";
import Text from "./Text";

import { useRepository } from '../hooks/useRepositories';
import theme from '../theme';
import { HorisontalView, VerticalView } from './Common'
import Moment from 'moment';

const styles = StyleSheet.create({
  separator: {
    backgroundColor: theme.colors.mainComponent,
    height: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    marginRight: 10,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignAtems: "center",
  }
});

export const ItemSeparator = () => <View style={styles.separator} />;

const formatDate = (date) => {
  Moment.locale('en');
  return Moment(date).format('DD.MM.yyyy');
};

export const ReviewItem = ({ review }) => {
  return (
    <HorisontalView>
      <View style={styles.circle}>
        <Text fontWeight="bold" fontSize="subheading" color="primary" style={{ textAlign: 'center' }}>{review.rating}</Text>
      </View>
      <VerticalView>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text>{formatDate(review.createdAt)}</Text>
        <Text>{review.text}</Text>
      </VerticalView>
    </HorisontalView>
  );
};

const RepositoryInfo = ({ repository, openInGitHub }) => {
  return (
    <View>
      <RepositoryItem repository={repository} />
      <PrimaryButton onPress={openInGitHub} label="Open in GitHub" />
      <ItemSeparator />
    </View>
  );
};

const SingleRepository = ({ repositoryId }) => {
  const params = {
    repositoryId,
    first: 5
  }
  const { repository, loading, error, fetchMore } = useRepository(params);
  if (loading) {
    return <Text>Loading...!</Text>;
  }
  if (error) {
    return <Text>Something went wrong!</Text>;
  }

  const openInGitHub = () => {
    Linking.openURL(repository.url);
  }

  const onEndReached = () => {
    fetchMore();
  };

  const reviews = repository.reviews.edges.map(edge => edge.node);
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} openInGitHub={openInGitHub} />}
    />
  )
};

export default SingleRepository;