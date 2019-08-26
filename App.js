import React from 'react';
import FlashMessage from 'react-native-flash-message';
import App1 from './app/App';

export default function App() {
  return (
    <React.Fragment>
      <App1 />
      <FlashMessage position="top" />
    </React.Fragment>
  );
}
