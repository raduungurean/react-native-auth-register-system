import React from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  orText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#ffffff',
    fontSize: 14,
  },
});

const OrText = () => (
  <View style={styles.orContainer}>
    <Text style={styles.orText}>OR</Text>
  </View>
);

export default OrText;
