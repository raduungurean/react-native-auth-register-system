import {
  LOADED_PROFILE,
  REQUESTS_IN_PROGRESS_LOAD_PROFILE,
  REQUESTS_IN_PROGRESS_LOADED_PROFILE,
  REQUESTS_IN_PROGRESS_UPDATE_PROFILE,
  REQUESTS_IN_PROGRESS_UPDATED_PROFILE, UPDATED_PROFILE,
} from '../constants/profile';

const INITIAL_STATE = {
  requestInProgressLoad: false,
  loadedProfile: false,
  requestInProgressUpdate: false,
  updatedProfile: false,
  info: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUESTS_IN_PROGRESS_LOAD_PROFILE: {
      return {
        ...state,
        requestInProgressLoad: true,
      };
    }

    case REQUESTS_IN_PROGRESS_LOADED_PROFILE: {
      return {
        ...state,
        requestInProgressLoad: false,
      };
    }

    case REQUESTS_IN_PROGRESS_UPDATE_PROFILE: {
      return {
        ...state,
        requestInProgressUpdate: true,
      };
    }

    case REQUESTS_IN_PROGRESS_UPDATED_PROFILE: {
      return {
        ...state,
        requestInProgressUpdate: false,
      };
    }

    case UPDATED_PROFILE: {
      return {
        ...state,
        updatedProfile: true,
      };
    }

    case LOADED_PROFILE: {
      return {
        ...state,
        loadedProfile: true,
        info: action.payload,
      };
    }

    default:
      return state;
  }
}
