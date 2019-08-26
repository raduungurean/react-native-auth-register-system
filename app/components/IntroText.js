import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const IntroText = ({
  h3, h4, title, bg,
}) => {
  let styles = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  };

  if (bg) {
    styles = {
      ...styles,
      backgroundColor: 'rgba(0,0,0,0.31)',
    };
  }

  return (
    <View style={styles}>
      <Text style={{ color: '#ffffff' }} h3={h3} h4={h4}>{title}</Text>
    </View>
  );
};

IntroText.defaultProps = {
  h3: false,
  h4: false,
  bg: false,
};

export default IntroText;
