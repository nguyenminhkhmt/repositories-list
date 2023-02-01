import React from 'react';
import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';

import Text from './Text';
import { StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: theme.colors.primary,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: theme.colors.white,
  },
});

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
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>Sign in</Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

export default SignIn;