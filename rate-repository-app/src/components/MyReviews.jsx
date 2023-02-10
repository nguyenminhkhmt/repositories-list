import { FlatList, View } from 'react-native';
import useCurrentUser from '../hooks/useCurrentUser';
import { HorisontalView, VerticalView } from './Common';
import PrimaryButton, { SecondaryButton } from './PrimaryButton';
import { ReviewItem, ItemSeparator } from './SingleRepository';
import Text from './Text';

const ReviewItemWrapper = ({ review, navigateRepo, deleteReview }) => {
  const handleNavigate = () => {
    navigateRepo(review.repositoryId);
  };

  const handleDelete = () => {
    deleteReview(review.id);
  }

  return (
    <VerticalView>
      <ReviewItem review={review} />
      <HorisontalView>
        <PrimaryButton onPress={handleNavigate} label="View repository" />
        <SecondaryButton onPress={handleDelete} label="Delete review" />
      </HorisontalView>
    </VerticalView>
  )
};

const MyReviews = ({ navigateRepo, deleteReview }) => {
  const { currentUser, fetchMore } = useCurrentUser({ includeReviews: true });
  const reviews = currentUser?.reviews ? currentUser?.reviews.edges.map(edge => edge.node) : [];

  if (reviews.length === 0) {
    return (
      <View style={{
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        alignAtems: "center",
      }}>
        <Text style={{ textAlign: 'center' }}>No entries</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItemWrapper review={item} navigateRepo={navigateRepo} deleteReview={deleteReview} />}
      keyExtractor={({ id }) => id}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.7}
    />
  )
};

export default MyReviews;