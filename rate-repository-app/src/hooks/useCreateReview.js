import { useMutation } from "@apollo/client";
import { CREATE_REVIEW, DELETE_REVIEW } from "../graphql/mutations";
import { GET_ME } from "../graphql/queries";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log("Review>>>>>", error.graphQLErrors[0].message);
    }
  });

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    const data = await mutate({
      variables: {
        review: {
          ownerName,
          rating,
          repositoryName,
          text
        }
      }
    });
    return data
  };

  return [createReview, result];
};

export const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log("Review>>>>>", error.graphQLErrors[0].message);
    },
    refetchQueries: [{ query: GET_ME, variables: { includeReviews: true } }]
  })

  const deleteReview = async (id) => {
    console.log(id);
    const data = await mutate({
      variables: { deleteReviewId: id }
    });
    return data
  };

  return [deleteReview, result];
}

export default useCreateReview;