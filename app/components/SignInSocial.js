import React from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Icon } from 'react-native-elements';

export default function SignInSocial({ onFacebookPress, onGooglePress }) {
  return (
    <Grid>
      <Col size={1} />
      <Col
        size={3}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon
          reverse
          name="logo-facebook"
          type="ionicon"
          color="#3C5A99"
          onPress={onFacebookPress}
        />
      </Col>
      <Col size={1} />
      <Col
        size={3}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon
          reverse
          name="logo-google"
          type="ionicon"
          color="#ffffff"
          reverseColor="#000000"
          onPress={onGooglePress}
        />
      </Col>
      <Col size={1} />
    </Grid>
  );
}
