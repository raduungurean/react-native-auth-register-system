import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';
import { showMessage } from 'react-native-flash-message';
import IntroText from '../../components/IntroText';
import BackToSignIn from '../../components/BackToSignIn';
import navigationService from '../../service/navigationService';
import RoundInput from '../../components/RoundInput';
import RoundButton from '../../components/RoundButton';
import { validateEmail } from '../../utils';
import { resetState, signUp } from '../../actions/sign-up';
import { resetErrorsForScreen } from '../../actions/errors';

const SignUpForm = ({
  signUp,
  registered,
  errors,
  resetState,
  requestInProgress,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (registered) {
      showMessage({
        message: 'A verification link has been sent to your email account',
        description: 'Please click on the that link has just been sent to your email account to verify your email and continue the registration process.',
        type: 'success',
        icon: 'success',
        duration: 5000,
      });
      resetErrorsForScreen('sign-up');
      resetState();
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      setValid(false);
    }
  }, [registered]);

  useEffect(() => {
    if (!isEmpty(errors)) {
      const errs = [];
      forOwn(errors, (value, key) => {
        errs.push(value);
      });
      showMessage({
        message: 'Error registering',
        description: errs.join('\r\n'),
        type: 'danger',
        icon: 'danger',
        duration: 5000,
      });
    }
  }, [errors]);

  useEffect(() => {
    if (firstName
      && firstName.length > 1
      && lastName
      && lastName.length > 1
      && email
      && password
      && password.length >= 5
      && passwordConfirmation
      && (password === passwordConfirmation)
      && validateEmail(email)
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [firstName, lastName, email, password, passwordConfirmation]);

  return (
    <React.Fragment>
      <IntroText h4 title="Sign Up" />
      <RoundInput
        onChangeText={v => setFirstName(v)}
        value={firstName}
        placeholder="First Name"
        icon={(
          <Icon
            name="user"
            size={24}
            type="font-awesome"
            color="#fff"
          />
        )}
      />
      <RoundInput
        onChangeText={v => setLastName(v)}
        value={lastName}
        placeholder="Last Name"
        icon={(
          <Icon
            name="user"
            size={24}
            type="font-awesome"
            color="#fff"
          />
        )}
      />
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
      <RoundInput
        onChangeText={v => setPassword(v)}
        value={password}
        placeholder="Password"
        secureTextEntry
        icon={(
          <Icon
            name="unlock"
            size={24}
            type="font-awesome"
            color="#fff"
          />
        )}
      />
      <RoundInput
        onChangeText={v => setPasswordConfirmation(v)}
        value={passwordConfirmation}
        secureTextEntry
        placeholder="Password Confirmation"
        icon={(
          <Icon
            name="unlock"
            size={24}
            type="font-awesome"
            color="#fff"
          />
        )}
      />
      <RoundButton
        enabled={valid && !requestInProgress}
        inProgress={requestInProgress}
        onPress={() => signUp({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation: passwordConfirmation,
        })}
        title="Sign Up"
      />
      <BackToSignIn onPress={() => navigationService.navigate('SignIn')} text="Go back to Sign In" />
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    requestInProgress: state.signUp.requestInProgress,
    registrationError: state.signUp.registrationError,
    errors: state.errors.errors['sign-up'] ? state.errors.errors['sign-up'] : {},
    registered: state.signUp.registered,
  };
}

export default connect(
  mapStateToProps, {
    signUp,
    resetErrorsForScreen,
    resetState,
  },
)(SignUpForm);
