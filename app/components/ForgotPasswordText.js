import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

const ForgotPasswordText = ({ onPress, text }) => (
  <View style={{
    marginTop: 5,
    marginRight: '10%',
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: '#ffffff', padding: 5 }}>{text}</Text>
    </TouchableOpacity>
  </View>
);

ForgotPasswordText.propTypes = {
  text: PropTypes.string,
};

export default ForgotPasswordText;
