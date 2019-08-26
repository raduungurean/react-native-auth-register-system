import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Alert } from 'react-native';
import { logout } from '../../actions/auth';
import navigationService from '../../service/navigationService';
import { resetErrorsForScreen } from '../../actions/errors';

class HomeActions extends Component {
  componentWillReceiveProps(nextProps, nextContext) {
    if (!this.props.errorMessage && nextProps.errorMessage) {
      Alert.alert(
        nextProps.errorMessage,
        '',
        [{ text: 'OK', onPress: () => this.props.resetErrorsForScreen('sign-out') }],
      );
    }
    if (this.props.user && !nextProps.user) {
      navigationService.navigate('Auth');
    }
  }

  signOutAsync = async () => {
    await this.props.logout();
  };

  render() {
    return (
      <React.Fragment>
        <Button containerStyle={{ margin: 5 }} title="Actually, sign me out :) 1" onPress={this.signOutAsync} />
      </React.Fragment>
    );
  }
}

HomeActions.propTypes = {};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    errorMessage: state.errors.errors['sign-out'] ? state.errors.errors['sign-out'] : null,
  };
}

export default connect(mapStateToProps, { logout, resetErrorsForScreen })(HomeActions);
