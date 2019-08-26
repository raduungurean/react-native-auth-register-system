import {
  AUTH_LOGGING_IN,
  AUTH_LOGGED_IN,
  AUTH_LOGOUT,
  AUTH_NOT_LOGGING_IN,
  AUTH_RESET_STATE,
} from '../constants/auth';
import { userService } from '../service/userService';
import navigationService from '../service/navigationService';
import { setErrors } from './errors';

export const loggedIn = data => ({
  type: AUTH_LOGGED_IN,
  payload: data,
});

export const loggingIn = () => ({
  type: AUTH_LOGGING_IN,
});

export const notLoggingIn = () => ({
  type: AUTH_NOT_LOGGING_IN,
});

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const logout = () => async (dispatch, getState) => {
  await userService.logout(getState).then((res) => {
  }).catch((err) => {
    dispatch(setErrors('sign-out', 'Error logging out.'));
  }).finally(() => { notLoggingIn(); dispatch(loggedOut()); });
};

export const resetState = () => ({
  type: AUTH_RESET_STATE,
});

export const login = (username, password) => (dispatch) => {
  dispatch(loggingIn());
  userService.login(username, password).then(async (res) => {
    await dispatch(loggedIn(res.data));
    await navigationService.navigate('App');
  }).catch((err) => {
    dispatch(setErrors('sign-in', { error: 'Wrong username or password' }));
  }).finally(() => notLoggingIn());
};

export const socialiteLogin = (provider, data) => (dispatch) => {
  dispatch(loggingIn());
  return userService.socialiteLogin(data, provider).then(async (res) => {
    await dispatch(loggedIn(res.data));
    await navigationService.navigate('App');
  }).catch(async (err) => {
    dispatch(setErrors('sign-in', { error: 'Unable to login.' }));
  }).finally(() => notLoggingIn());
};
