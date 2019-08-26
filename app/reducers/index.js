import { composeWithDevTools } from 'redux-devtools-extension';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth';
import errorsReducer from './errors';
import signUpReducer from './sign-up';
import profileReducer from './profile';
import forgotPasswordReducer from './forgot-password';

const reducers = combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  errors: errorsReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
});

const middleware = [thunk];

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
