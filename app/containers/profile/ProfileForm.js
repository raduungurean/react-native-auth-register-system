import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import isEmpty from 'lodash/isEmpty';
import { showMessage } from 'react-native-flash-message';
import { ImagePicker, Permissions, Constants } from 'expo';
import { Avatar, Card } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import ProfileMainForm from '../../components/ProfileMainForm';
import ProfileChangePasswordForm from '../../components/ProfileChangePasswordForm';
import { loadProfile, updateProfile, uploadProfileImageAction } from '../../actions/profile';

const ProfileForm = ({
  loadProfile,
  profile,
  isFocused,
  updateProfile,
  updatedProfile,
  uploadProfileImageAction,
}) => {
  const [image, setImage] = useState(null);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadProfile();
    }
  }, [isFocused]);

  useEffect(() => {
    if (updatedProfile) {
      showMessage({
        message: 'Success.',
        description: 'Profile Updated.',
        type: 'success',
        icon: 'success',
        duration: 5000,
      });
    }
  }, [updatedProfile]);

  if (isEmpty(profile.info)) {
    return null;
  }

  async function uploadImageAsync(uri) {
    await uploadProfileImageAction(uri);
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      await setImage(result.uri);
      await uploadImageAsync(result.uri);
    }
  };

  return (
    <React.Fragment>
      <ProfileMainForm
        isLoading={profile.requestInProgressLoad}
        isUpdating={profile.requestInProgressUpdate}
        profileInfo={profile.info}
        onPress={profileData => updateProfile(profileData)}
      />
      <ProfileChangePasswordForm
        isLoading={profile.requestInProgressLoad}
        profileInfo={profile.info}
      />
      <Card style={{ paddingTop: 10, marginTop: 10 }}>
        <Card.Title
          title="Profile Image"
          left={props => <Avatar.Icon {...props} icon="camera" />}
        />
        <Card.Content>
          <Grid>
            <Col>
              <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
              />
            </Col>
            <Col style={{ flex: 1, alignItems: 'center' }}>
              {image && <Image source={{ uri: image }} style={{ height: 50, width: 50 }} />}
            </Col>
          </Grid>
        </Card.Content>
      </Card>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    updatedProfile: state.profile.updatedProfile,
  };
}

export default withNavigationFocus(connect(mapStateToProps, {
  loadProfile,
  updateProfile,
  uploadProfileImageAction,
})(ProfileForm));
