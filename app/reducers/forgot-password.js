import {
  FORGOT_PASSWORD_OK,
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE,
  SENT_RECOVER_PASSWORD_REQUEST,
  RESET_FORGOT_PASSWORD_STATE,
} from '../constants/forgot-password';

const INITIAL_STATE = {
  requestInProgress: false,
  success: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SENT_RECOVER_PASSWORD_REQUEST: {
      return {
        ...INITIAL_STATE,
        success: true,
      };
    }

    case FORGOT_PASSWORD_OK: {
      return {
        ...state,
        requestInProgress: true,
      };
    }

    case REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE: {
      return {
        ...state,
        requestInProgress: false,
      };
    }

    case RESET_FORGOT_PASSWORD_STATE: {
      return {
        ...INITIAL_STATE,
      };
    }

    default:
      return state;
  }
}
