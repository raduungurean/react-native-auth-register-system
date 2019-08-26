import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import React from 'react';

const styles = StyleSheet.create({
  inputWrapper: {},
  inputFieldContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'rgba(255,255,255,0.7)',
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  inputField: {
    backgroundColor: 'transparent',
    color: '#fff',
  },
  iconStyle: {
    marginRight: 5,
    marginLeft: 5,
    width: 30,
  },
});

export default function RoundInput({
  onChangeText, value, icon, secureTextEntry, placeholder,
}) {
  return (
    <View style={styles.inputWrapper}>
      <Input
        secureTextEntry={!!secureTextEntry}
        autoCapitalize="none"
        containerStyle={styles.inputFieldContainer}
        inputStyle={styles.inputField}
        placeholder={placeholder}
        leftIconContainerStyle={styles.iconStyle}
        placeholderTextColor="#fff"
        onChangeText={onChangeText}
        value={value}
        leftIcon={icon || null}
      />
    </View>
  );
}

RoundInput.defaultProps = {
  secureTextEntry: false,
};

RoundInput.propTypes = {
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};
