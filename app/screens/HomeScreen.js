import React from 'react';
import PropTypes from 'prop-types';
import ScreenContainer from '../components/ScreenContainer';
import HomeActions from '../containers/home/HomeActions';
import DrawerMenuIcon from '../components/DrawerMenuIcon';

const HomeScreen = () => (
  <ScreenContainer>
    <HomeActions />
  </ScreenContainer>
);

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Home',
  headerLeft: <DrawerMenuIcon navigation={navigation} />,
});

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
