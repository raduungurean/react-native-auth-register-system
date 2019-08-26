import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: ScreenHeight,
  },
  containerLoggedIn: {
    flex: 1,
    height: ScreenHeight,
    padding: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  contentSecond: {
    width: '100%',
    top: -20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});

const ScreenContainer = ({ children, authScreen }) => {
  if (authScreen) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground
          source={require('../../assets/bgImage.jpg')}
          style={styles.imageBackground}
        >
          <View style={styles.content}>
            <View style={styles.contentSecond}>
              {children}
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.containerLoggedIn}>
      {children}
    </ScrollView>
  );
};

ScreenContainer.defaultProps = {
  authScreen: false,
};

ScreenContainer.propTypes = {
  authScreen: PropTypes.bool,
};

export default ScreenContainer;
