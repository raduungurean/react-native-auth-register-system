import {
  REGISTERED,
  REQUESTS_IN_PROGRESS_REGISTER,
  REGISTERED_OK,
  RESET_REGISTRATION,
} from '../constants/sign-up';
import { handleErrors } from './errors';
import { userService } from '../service/userService';

export const requestInProgress = (isRequestInProgress = true) => {
  if (isRequestInProgress) {
    return {
      type: REQUESTS_IN_PROGRESS_REGISTER,
    };
  }
  return {
    type: REGISTERED_OK,
  };
};

export const registered = () => ({
  type: REGISTERED,
});

export const resetState = () => ({
  type: RESET_REGISTRATION,
});

export const signUp = user => (dispatch) => {
  dispatch(requestInProgress());
  return userService.signUp(user).then(async (res) => {
    await dispatch(registered(res.data));
  }).catch(async (err) => {
    dispatch(handleErrors('sign-up', 'Error signing up.', err));
  }).finally(() => dispatch(requestInProgress(false)));
};
