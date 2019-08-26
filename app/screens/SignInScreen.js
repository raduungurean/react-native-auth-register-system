import React from 'react';
import PropTypes from 'prop-types';
import ScreenContainer from '../components/ScreenContainer';
import SignInForm from '../containers/auth/SignInForm';

const SignInScreen = props => (
  <ScreenContainer authScreen>
    <SignInForm navigation={props.navigation} />
  </ScreenContainer>
);

SignInScreen.navigationOptions = {
  header: null,
};

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignInScreen;
