import React from 'react';
import {View, Text,StyleSheet,Dimensions} from 'react-native';

import PanoramaView from "@lightbase/react-native-panorama-view";

const Profile1 = () => (
  <View style={styles.container}>
    <PanoramaView
      style={styles.viewer}
      dimensions={{ height: 450, width: Dimensions.get("window").width }}
      inputType="mono"
      imageUrl="https://www.airpano.com/photogallery/images_1550/2_910676.jpg"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewer: {
    height: '100%',
  },
});

export default Profile1;