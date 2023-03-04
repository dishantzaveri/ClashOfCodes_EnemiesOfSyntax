import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity,Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Splash({ navigation }) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animation.json')}
        autoPlay={true}
        loop={false}

        style={styles.animation}
      />
      <View style={{flexDirection:'row',alignSelf:'center',margin:40}}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
        navigation.navigate('bottomtabs');
        console.log("Hello!");
        }}><Text style={styles.textStyle}>Vocally</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  animation: {
    width: 300,
    height: 300,
    margin: 85,
    marginLeft: 20
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
    height: 150,
    width: 300
  },
  textStyle: {
    color: 'white',

    fontSize:18,
  },
  button:{
    backgroundColor:'#0065ff',
    margin:10,
    padding:10,
    borderRadius:10,
    marginTop:50
    
}
});
