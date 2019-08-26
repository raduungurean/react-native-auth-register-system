import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../config';

async function loadProfile() {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('userToken');
    await axios.get(`${config.API_URL}/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}

async function updateProfile(profileData) {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('userToken');
    await axios.post(`${config.API_URL}/profile`, profileData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}

async function uploadProfileImage(data) {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('userToken');
    await axios({
      method: 'POST',
      url: `${config.API_URL}/profile`,
      data,
      headers: {
        authorization: `Bearer ${token}`
      },
    }).then(async (response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}

export const profileService = {
  loadProfile,
  updateProfile,
  uploadProfileImage,
};
