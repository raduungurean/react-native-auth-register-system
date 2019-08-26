import { AsyncStorage } from 'react-native';
import { SET_ERRORS, RESET_ERRORS_EXCEPT, RESET_ERRORS } from '../constants/errors';
import { AUTH_LOGOUT } from '../constants/auth';

export const setErrors = (screen, errors) => ({
  type: SET_ERRORS,
  payload: {
    errors,
    screen,
  },
});

export const resetErrorsExcept = except => ({
  type: RESET_ERRORS_EXCEPT,
  payload: except,
});

export const resetErrorsForScreen = screen => ({
  type: RESET_ERRORS,
  payload: {
    screen,
  },
});

export const handleErrors = (screen, specificErrorMessage, err) => async (dispatch) => {
  if (err.response && err.response.status) {
    if (err.response.status === 401 && screen !== 'sign-in') {
      await dispatch({
        type: AUTH_LOGOUT,
      });
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('userToken');
    } else if (err.response && err.response.data.errors) {
      dispatch(setErrors(screen, err.response.data.errors));
    } else {
      dispatch(setErrors(screen, { error: specificErrorMessage }));
    }
  }
};
