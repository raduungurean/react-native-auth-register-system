import React, { useEffect, useState } from 'react';
import { Button, TextInput, Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { validateEmail } from '../utils';

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
    marginBottom: 20,
  },
});

const ProfileMainForm = ({
  isLoading,
  isUpdating,
  profileInfo,
  onPress,
}) => {
  const [firstName, setFirstName] = useState(profileInfo.first_name);
  const [lastName, setLastName] = useState(profileInfo.last_name);
  const [email, setEmail] = useState(profileInfo.email);

  const getValid = () => (firstName && firstName.length >= 2) && (lastName && lastName.length >= 2) && validateEmail(email);

  let isValid = getValid();
  useEffect(() => {
    isValid = getValid();
  }, [firstName, lastName, email]);

  return (
    <React.Fragment>
      <Title>Profile</Title>
      <TextInput
        mode="outlined"
        padding="none"
        dense
        label="First Name"
        value={firstName || ''}
        onChangeText={text => setFirstName(text)}
        placeholder="Enter your first name"
        style={styles.inputText}
      />
      <TextInput
        mode="outlined"
        padding="none"
        dense
        label="Last Name"
        value={lastName || ''}
        onChangeText={text => setLastName(text)}
        placeholder="Enter your last name"
        style={styles.inputText}
      />
      <TextInput
        mode="outlined"
        padding="none"
        dense
        label="Email"
        value={email || ''}
        onChangeText={text => setEmail(text)}
        placeholder="Enter your email address"
        style={styles.inputText}
      />
      <Button
        disabled={isLoading || !isValid}
        mode="contained"
        onPress={() => onPress({
          firstName, lastName, email,
        })}
        style={styles.button}
      >
        {isUpdating ? 'Updating...' : 'Update'}
      </Button>
    </React.Fragment>
  );
};

export default ProfileMainForm;
