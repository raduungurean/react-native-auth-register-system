import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';
import * as Facebook from 'expo-facebook';
// import * as GoogleSignIn from 'expo-google-sign-in';
import {
  login, notLoggingIn, resetState, socialiteLogin,
} from '../../actions/auth';
import { resetErrorsForScreen } from '../../actions/errors';
import IntroText from '../../components/IntroText';
import SignInSocial from '../../components/SignInSocial';
import SignUpNowText from '../../components/SignUpNowText';
import ForgotPasswordText from '../../components/ForgotPasswordText';
import navigationService from '../../service/navigationService';
import RoundInput from '../../components/RoundInput';
import RoundButton from '../../components/RoundButton';
import { validateEmail } from '../../utils';
import OrText from '../../components/OrText';
import config from '../../config';

const SignInForm = ({
  login,
  requestInProgressLoggingIn,
  errors,
  notLoggingIn,
  socialiteLogin,
}) => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    if (validateEmail(username)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [username]);

  useEffect(() => {
    if (!isEmpty(errors)) {
      const errs = [];
      forOwn(errors, (value, key) => {
        errs.push(value);
      });
      showMessage({
        message: 'Login Error',
        description: errs.join('\r\n'),
        type: 'danger',
        icon: 'danger',
        duration: 5000,
      });
      notLoggingIn();
    }
  }, [errors]);

  useEffect(() => {
    setValidPassword(password.length >= 5);
  }, [password]);

  const facebookSignIn = async () => {
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync(config.FACEBOOK_APP_ID, {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        await socialiteLogin('facebook', `?token=${token}`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  // TODO, refactor this to be on server
  // btw, this is not working
  const googleSignIn = async () => {
    // try {
    //   await GoogleSignIn.askForPlayServicesAsync();
    //   const { type, user } = await GoogleSignIn.signInAsync();
    //   console.log('user', user);
    //   if (type === 'success') {
    //     await GoogleSignIn.signInSilentlyAsync();
    //   }
    // } catch ({ message }) {
    //   alert('login: Error:' + message);
    // }
  };

  return (
    <React.Fragment>
      <IntroText h4 title="Sign In" />
      <RoundInput
        onChangeText={usr => setEmail(usr)}
        value={username}
        placeholder="Email"
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
        placeholder="Password"
        onChangeText={pass => setPassword(pass)}
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
      <RoundButton
        enabled={validEmail && validPassword && !requestInProgressLoggingIn}
        inProgress={requestInProgressLoggingIn}
        onPress={() => login(username, password)}
        title="Sign In"
      />
      <SignUpNowText
        text="New User? Sign Up Now"
        onPress={() => navigationService.navigate('SignUp')}
      />
      <ForgotPasswordText
        text="Forgot Password?"
        onPress={() => navigationService.navigate('ForgotPassword')}
      />
      <OrText />
      <View>
        <SignInSocial
          onFacebookPress={facebookSignIn}
          onGooglePress={googleSignIn}
        />
      </View>
      <View style={{ height: 55 }}><Text /></View>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    requestInProgressLoggingIn: state.auth.requestInProgressLoggingIn,
    errors: state.errors.errors['sign-in'] ? state.errors.errors['sign-in'] : '',
  };
}

export default connect(mapStateToProps, {
  login,
  resetErrorsForScreen,
  resetState,
  notLoggingIn,
  socialiteLogin,
})(SignInForm);
