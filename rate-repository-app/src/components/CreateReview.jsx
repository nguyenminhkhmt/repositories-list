import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import PrimaryButton from './PrimaryButton';
import * as Yup from 'yup';

const CreateReviewSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required('Repository owner name is required!'),
  repositoryName: Yup.string()
    .required('Repository name is required!'),
  rating: Yup.number()
    .min(0, 'Rating must be a number between 0 and 100')
    .max(100, 'Rating must be a number between 0 and 100')
    .required('Rating is required'),
  text: Yup.string(),
});

const CreateReview = props => {
  return (
    <Formik
      initialValues={{
        ownerName: '',
        rating: '',
        repositoryName: '',
        text: ''
      }}
      onSubmit={(values) => {
        props.onSubmit(values);
      }}
      validationSchema={CreateReviewSchema}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="text" placeholder="Review" />
          <PrimaryButton onPress={handleSubmit} label="Create a review" />
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;