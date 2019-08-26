import React from 'react';
import PropTypes from 'prop-types';
import ScreenContainer from '../components/ScreenContainer';
import ForgotPasswordForm from '../containers/forgot-password/ForgotPasswordForm';

const ForgotPasswordScreen = props => (
  <ScreenContainer authScreen>
    <ForgotPasswordForm />
  </ScreenContainer>
);

ForgotPasswordScreen.navigationOptions = {
  header: null,
};

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ForgotPasswordScreen;
