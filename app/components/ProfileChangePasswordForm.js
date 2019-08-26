import React from 'react';
import { Button, TextInput, Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputText: {
    backgroundColor: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

const ProfileChangePasswordForm = ({ isLoading }) => (
  <React.Fragment>
    <Title>Change Password</Title>
    <TextInput mode="outlined" padding="none" dense secureTextEntry label="Password" placeholder="Enter your new password" style={styles.inputText} />
    <TextInput mode="outlined" padding="none" dense secureTextEntry label="Password Confirmation" placeholder="Confirm your new password" style={styles.inputText} />
    <Button disabled={isLoading} icon="security" mode="contained" onPress={() => console.log('Pressed')} style={styles.button}>Change Password</Button>
  </React.Fragment>
);

export default ProfileChangePasswordForm;
