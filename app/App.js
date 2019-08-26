import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AppContainer from './navigation';
import store from './reducers';
import theme from './theme';
import navigationService from './service/navigationService';

const themePaper = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2089DC',
  },
};

const App1 = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PaperProvider theme={themePaper}>
        <AppContainer
          ref={(navigatorRef) => {
            navigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </PaperProvider>
    </Provider>
  </ThemeProvider>
);

export default App1;

AppRegistry.registerComponent('main', () => App1);
