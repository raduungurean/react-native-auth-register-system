import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';
import IntroText from '../../components/IntroText';
import BackToSignIn from '../../components/BackToSignIn';
import navigationService from '../../service/navigationService';
import RoundButton from '../../components/RoundButton';
import RoundInput from '../../components/RoundInput';
import { resetErrorsForScreen } from '../../actions/errors';
import { recoverPasswordRequest, resetState } from '../../actions/forgot-password';
import { validateEmail } from '../../utils';

const ForgotPasswordForm = ({
  resetState,
  success,
  requestInProgress,
  recoverPasswordRequest,
  errors,
}) => {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    if (validateEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  useEffect(() => {
    if (!isEmpty(errors)) {
      const errs = [];
      forOwn(errors, (value, key) => {
        errs.push(value);
      });
      showMessage({
        message: 'Error recovering your password',
        description: errs.join('\r\n'),
        type: 'danger',
        icon: 'danger',
        duration: 5000,
      });
    }
  }, [errors]);

  useEffect(() => {
    if (success) {
      showMessage({
        message: 'Reset password',
        description: 'Please click on the link that has just been sent to your email account to reset your password.',
        type: 'success',
        icon: 'success',
        duration: 5000,
      });
      resetState();
      setEmail('');
      setValidEmail(false);
    }
  }, [success]);

  return (
    <React.Fragment>
      <IntroText h4 title="Forgot Password ?" />
      <RoundInput
        onChangeText={v => setEmail(v)}
        value={email}
        placeholder="Email"
        icon={(
          <Icon
            name="envelope"
            size={24}
            type="font-awesome"
            color="#fff"
          />
        )}
      />
      <RoundButton
        enabled={validEmail && !requestInProgress}
        inProgress={requestInProgress}
        onPress={() => {
          recoverPasswordRequest(email);
        }}
        title="Recover my password"
      />
      <BackToSignIn
        onPress={() => navigationService.navigate('SignIn')}
        text="Go back to Sign In"
      />
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    requestInProgress: state.forgotPassword.requestInProgress,
    success: state.forgotPassword.success,
    errors: state.errors.errors['forgot-password'] ? state.errors.errors['forgot-password'] : {},
  };
}

export default connect(
  mapStateToProps, {
    resetErrorsForScreen,
    resetState,
    recoverPasswordRequest,
  },
)(ForgotPasswordForm);
