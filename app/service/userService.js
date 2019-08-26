import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../config';

function login(username, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${config.API_URL}/auth/login`, {
      email: username,
      password,
    }).then((response) => {
      AsyncStorage.setItem('userToken', response.data.token)
        .then(() => {
          resolve(response);
          AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        });
    }).catch(err => reject(err));
  });
}

async function logout(getState) {
  return new Promise(async (resolve, reject) => {
    const currentState = await getState();
    const { token } = currentState.auth;
    axios.post(`${config.API_URL}/auth/logout`, {}, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    }).finally(async () => {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('userToken');
    });
  });
}

async function signUp(registerData) {
  return new Promise(async (resolve, reject) => {
    axios.post(`${config.API_URL}/sign-up`, registerData)
      .then(async (response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
  });
}

async function sendPasswordRecover(email) {
  return new Promise(async (resolve, reject) => {
    axios.post(`${config.API_URL}/forgot-password`, { email })
      .then(async (response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
  });
}

async function socialiteLogin(data, provider) {
  return new Promise((resolve, reject) => {
    axios.post(`${config.OAUTH_HANDLE_URL}/${provider}${data}`, {}, {
    }).then(async (response) => {
      resolve(response);
      AsyncStorage.setItem('userToken', response.data.token)
        .then(() => {
          resolve(response);
          AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        });
    }).catch((err) => {
      reject(err);
    });
  });
}

export const userService = {
  login,
  logout,
  signUp,
  sendPasswordRecover,
  socialiteLogin,
};
