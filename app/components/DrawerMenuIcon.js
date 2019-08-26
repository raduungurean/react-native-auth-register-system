import React from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';

const DrawerMenuIcon = ({ navigation }) => (
  <View style={{ marginLeft: 15, marginRight: 15 }}>
    <Icon
      onPress={() => navigation.openDrawer()}
      name="bars"
      type="font-awesome"
    />
  </View>
);

export default DrawerMenuIcon;
