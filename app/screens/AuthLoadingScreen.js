import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import store from '../reducers';
import checkAsyncStorage from '../helpers/checkAsyncStorage';
import { loggedIn } from '../actions/auth';
import navigationService from '../service/navigationService';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userStorage = await checkAsyncStorage();
    await store.dispatch(this.props.loggedIn({
      user: userStorage.user,
      token: userStorage.token,
    }));
    await navigationService.navigate(userStorage.token ? 'App' : 'Auth', {});
  };

  render() {
    return (
      <ScreenContainer>
        <ActivityIndicator />
      </ScreenContainer>
    );
  }
}

function mapStateToProps(state) {
  return { requestInProgressLoggingIn: state.auth.loggingIn };
}

export default connect(mapStateToProps, { loggedIn })(AuthLoadingScreen);
