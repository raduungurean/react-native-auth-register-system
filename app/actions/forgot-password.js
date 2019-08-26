import {
  FORGOT_PASSWORD_OK,
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE,
  RESET_FORGOT_PASSWORD_STATE,
  SENT_RECOVER_PASSWORD_REQUEST,
} from '../constants/forgot-password';
import { handleErrors } from './errors';
import { userService } from '../service/userService';

export const requestInProgress = (isRequestInProgress = true) => {
  if (isRequestInProgress) {
    return {
      type: FORGOT_PASSWORD_OK,
    };
  }
  return {
    type: REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE,
  };
};

export const sentRecoverRequest = () => ({
  type: SENT_RECOVER_PASSWORD_REQUEST,
});

export const resetState = () => ({
  type: RESET_FORGOT_PASSWORD_STATE,
});

export const recoverPasswordRequest = email => (dispatch) => {
  dispatch(requestInProgress());
  return userService.sendPasswordRecover(email).then(async (res) => {
    await dispatch(sentRecoverRequest(res.data));
  }).catch(async (err) => {
    dispatch(handleErrors('forgot-password', 'Error sending request.', err));
  }).finally(() => dispatch(requestInProgress(false)));
};
