import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

class SignOutScreen extends Component {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, { logout })(SignOutScreen);
