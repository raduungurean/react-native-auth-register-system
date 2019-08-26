import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignOutScreen from '../screens/SignOutScreen';

const AppStack = createDrawerNavigator({
  Home: {
    screen: createStackNavigator({ Home: HomeScreen }),
  },
  Profile: {
    screen: createStackNavigator({ Profile: ProfileScreen }),
  },
  'Sign Out': {
    screen: createStackNavigator({ SignOut: SignOutScreen }),
  },
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  ForgotPassword: ForgotPasswordScreen,
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));

export default AppContainer;
