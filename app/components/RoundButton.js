import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import React from 'react';

const styles = StyleSheet.create({
  inputWrapper: {},
});

export default function RoundButton({
  enabled,
  inProgress,
  onPress,
  title,
}) {
  return (
    <View style={styles.inputWrapper}>
      <Button
        disabled={!enabled}
        containerStyle={{
          marginLeft: '16%',
          marginRight: '16%',
          marginTop: 20,
        }}
        buttonStyle={{
          backgroundColor: 'rgba(6,138,23,0.87)',
          borderRadius: 25,
        }}
        titleStyle={{ textTransform: 'uppercase' }}
        disabledStyle={{ backgroundColor: 'rgba(66,133,82,0.87)' }}
        icon={inProgress ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : null}
        onPress={onPress}
        title={title}
      />
    </View>
  );
}

RoundButton.propTypes = {
  enabled: PropTypes.bool,
  inProgress: PropTypes.bool,
  onPress: PropTypes.func,
  title: PropTypes.string,
};
