import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import PrimaryButton from './PrimaryButton';

const SignIn = (props) => (
  <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    onSubmit={(values) => {
      props.onSubmit(values);
    }}
    validate={(values) => {
      const errors = {};
      if (!values.username) {
        errors.username = "Username is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    }}
  >
    {({ handleSubmit }) => (
      <View>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
        <PrimaryButton onPress={handleSubmit} label="Sign in"/>
      </View>
    )}
  </Formik>
);

export default SignIn;