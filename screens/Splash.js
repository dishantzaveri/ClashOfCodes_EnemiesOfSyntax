// import React from 'react';
// import { StyleSheet, View, Image, TouchableOpacity,Text } from 'react-native';
// import LottieView from 'lottie-react-native';

// export default function Splash({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <LottieView
//         source={require('../assets/animation.json')}
//         autoPlay={true}
//         loop={false}

//         style={styles.animation}
//       />
//       <View style={{flexDirection:'row',alignSelf:'center',margin:40}}>
//         <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//         navigation.navigate('LoginScreen');
//         console.log("Hello!");
//         }}><Text style={styles.textStyle}>TravelBuddy</Text>
//       </TouchableOpacity>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',

//   },
//   animation: {
//     width: 300,
//     height: 300,
//     margin: 85,
//     marginLeft: 20
//   },
//   image: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 50,
//     height: 150,
//     width: 300
//   },
//   textStyle: {
//     color: 'white',

//     fontSize:18,
//   },
//   button:{
//     backgroundColor:'#0065ff',
//     margin:10,
//     padding:10,
//     borderRadius:10,
//     marginTop:50
    
// }
// });

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions
} from 'react-native'
var {height, width} = Dimensions.get('window')
export default class Splash extends Component {
    static navigationOptions = {
        header: null,    
    }
    state = {
        logoOpacity: new Animated.Value(0),
        titleMarginTop: new Animated.Value(height / 2)
    }
    async componentDidMount() {
        //Add animations here
        Animated.sequence([
            //animations by sequence
            Animated.timing(this.state.logoOpacity,{
                toValue: 1,                  
                duration: 1500, 
                useNativeDriver: false          
            }),
            //Animate Text ?
            Animated.timing(this.state.titleMarginTop, {
                toValue: 10,
                duration: 1000,
                useNativeDriver: false  //1000 miliseconds = 1 second
            })
        ]).start(() => {
            //End of animations
            //How to navigate to Login ? => Use StackNavigation
            this.props.navigation.navigate("LoginScreen")
        })
    }
    render() {
        return <View style={styles.container}>
            <Animated.Image source={require('../assets/logo.jpeg')} 
                style={{...styles.logo, opacity: this.state.logoOpacity}} >                
            </Animated.Image>
            <Animated.Text style={{...styles.title, 
                                marginTop:this.state.titleMarginTop}}>
                tripright
            </Animated.Text>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 10 ,
    },
    title: {        
        color: 'black',
        marginTop: 10,    
        textAlign: 'center',
        width: 400,
        fontSize: 30
    }
})