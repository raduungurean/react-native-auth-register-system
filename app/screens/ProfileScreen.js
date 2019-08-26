import React from 'react';
import PropTypes from 'prop-types';
import ScreenContainer from '../components/ScreenContainer';
import DrawerMenuIcon from '../components/DrawerMenuIcon';
import ProfileForm from '../containers/profile/ProfileForm';

const ProfileScreen = () => (
  <ScreenContainer>
    <ProfileForm />
  </ScreenContainer>
);

ProfileScreen.navigationOptions = ({ navigation }) => ({
  title: 'Profile',
  headerLeft: <DrawerMenuIcon navigation={navigation} />,
});

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileScreen;
