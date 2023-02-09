import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import PrimaryButton from './PrimaryButton';
import * as Yup from 'yup';

const SignUpScheme = Yup.object().shape({
  username: Yup.string()
    .min(1, "Username is a required string with a length between 1 and 30")
    .max(30, "Username is a required string with a length between 1 and 30")
    .required('Username is required!'),
  password: Yup.string()
    .min(5, 'Password is a required string with a length between 5 and 50')
    .max(50, 'Password is a required string with a length between 5 and 50')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), "Confirm password does not match with password"])
    .required('Confirm password is required')
});

const SignUp = (props) => (
  <Formik
    initialValues={{
      username: '',
      password: '',
      confirmPassword: ''
    }}
    onSubmit={(values) => {
      props.onSubmit(values);
    }}
    validationSchema={SignUpScheme}
  >
    {({ handleSubmit }) => (
      <View>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
        <FormikTextInput name="confirmPassword" placeholder="Confirm password" secureTextEntry />
        <PrimaryButton onPress={handleSubmit} label="Sign up" />
      </View>
    )}
  </Formik>
);

export default SignUp;