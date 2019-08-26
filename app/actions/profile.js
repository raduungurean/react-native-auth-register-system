import { handleErrors } from './errors';
import {
  LOADED_PROFILE,
  REQUESTS_IN_PROGRESS_LOAD_PROFILE,
  REQUESTS_IN_PROGRESS_LOADED_PROFILE,
  REQUESTS_IN_PROGRESS_UPDATE_PROFILE,
  REQUESTS_IN_PROGRESS_UPDATED_PROFILE,
  UPDATED_PROFILE,
} from '../constants/profile';
import { profileService } from '../service/profileService';

export const requestInProgressLoadProfile = (isRequestInProgress = true) => {
  if (isRequestInProgress) {
    return {
      type: REQUESTS_IN_PROGRESS_LOAD_PROFILE,
    };
  }
  return {
    type: REQUESTS_IN_PROGRESS_LOADED_PROFILE,
  };
};

export const requestInProgressUpdateProfile = (isRequestInProgress = true) => {
  if (isRequestInProgress) {
    return {
      type: REQUESTS_IN_PROGRESS_UPDATE_PROFILE,
    };
  }
  return {
    type: REQUESTS_IN_PROGRESS_UPDATED_PROFILE,
  };
};

export const loadedProfile = data => ({
  type: LOADED_PROFILE,
  payload: data,
});

export const updatedProfile = () => ({
  type: UPDATED_PROFILE,
});

export const loadProfile = user => (dispatch) => {
  dispatch(requestInProgressLoadProfile());
  return profileService.loadProfile(user).then(async (res) => {
    await dispatch(loadedProfile(res.data));
  }).catch(async (err) => {
    dispatch(handleErrors('loading-profile', 'Error loading profile.', err));
  }).finally(() => dispatch(requestInProgressLoadProfile(false)));
};

export const updateProfile = profileData => (dispatch) => {
  dispatch(requestInProgressUpdateProfile());
  return profileService.updateProfile(profileData).then(async (res) => {
    await dispatch(updatedProfile());
  }).catch(async (err) => {
    dispatch(handleErrors('update-profile', 'Error updating profile.', err));
  }).finally(() => dispatch(requestInProgressUpdateProfile(false)));
};

export const uploadProfileImageAction = uri => (dispatch) => {
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  const formData = new FormData();

  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  return profileService.uploadProfileImage(formData).then(() => {
    console.log('uploaded');
  }).catch(() => console.log('upload error'));
};
