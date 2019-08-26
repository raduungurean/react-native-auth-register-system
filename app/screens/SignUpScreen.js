import React from 'react';
import PropTypes from 'prop-types';
import ScreenContainer from '../components/ScreenContainer';
import SignUpForm from '../containers/sign-up/SignUpForm';

const SignUpScreen = props => (
  <ScreenContainer authScreen>
    <SignUpForm />
  </ScreenContainer>
);

SignUpScreen.navigationOptions = {
  header: null,
};

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUpScreen;
