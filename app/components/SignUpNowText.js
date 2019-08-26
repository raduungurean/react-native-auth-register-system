import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

const SignUpNowText = ({ onPress, text }) => (
  <View style={{
    marginTop: 10,
    marginRight: '16%',
    marginLeft: '16%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 3,
  }}
  >
    <TouchableOpacity onPress={onPress}>
      <Text style={{
        color: '#ffffff',
        padding: 5,
      }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  </View>
);

SignUpNowText.propTypes = {
  text: PropTypes.string,
};

export default SignUpNowText;
