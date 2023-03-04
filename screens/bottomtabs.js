import React from 'react';
import { View, Animated, Dimensions, Platform, StyleSheet, Text, Button, TouchableOpacity, TextInput, Image, ToastAndroid } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import plus from '../assets/plus.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useRef } from 'react';
import Location from './location';
import Location2 from './location2';
import Location1 from './location1';
import Location3 from './location3';
import AddProject from './AddProject';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabs = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  console.disableYellowBox = true;
  return (
  
      <Tab.Navigator independent={true}
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 40,
            marginHorizontal: 20,
            // Max Height...
            height: 60,
            borderRadius: 10,
            // Shadow...
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10
            },
            paddingHorizontal: 20,
          }
        }}
        screenOptions={{
          tabBarActiveBackgroundColor: "#FFFFFF",
          tabBarInactiveBackgroundColor: "#FFFFFF",

        }}
      >
        <Tab.Screen name="location" component={Location} options={{

          headerShown: false,
          tabBarLabel: 'Default',
          tabBarColor: 'blue',
          tabBarIcon: ({ color }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <Icon name="ios-location" color={color} size={26} />
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

        <Tab.Screen name="location1" component={Location1} options={{

          headerShown: false,
          tabBarLabel: 'Black',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <Icon name="pause" color={color} size={26} />
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>


        {

          // Extra Tab Screen For Action Button..
        }

        <Tab.Screen name={"ActionButton"} component={EmptyScreen} options={{
          tabBarIcon: ({ focused }) => (

            <TouchableOpacity>
              <View style={{
                width: 55,
                height: 55,
                backgroundColor: 'red',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: Platform.OS == "android" ? 50 : 30
              }}>
                <Image source={plus} style={{
                  width: 22,
                  height: 22,
                  tintColor: 'white',
                }}></Image>
              </View>
            </TouchableOpacity>
          )
        }}></Tab.Screen>

        <Tab.Screen name="location2" component={Location2} options={{

          headerShown: false,
          tabBarLabel: "Aubergine",
          tabBarColor: '#000000',


          tabBarIcon: ({ color }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <Icon name="notifications-outline" color={color} size={26} />
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

        <Tab.Screen name="location3"
          component={Location3} options={{

            headerShown: false,
            tabBarLabel: "Retro",
            tabBarColor: '#1f65ff',
            tabBarIcon: ({ color }) => (
              <View style={{
                // centring Tab Button...
                position: 'absolute',
                top: 20
              }}>
                <Icon name="md-person-outline" color={color} size={26} />
              </View>
            )
          }} listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true
              }).start();
            }
          })}></Tab.Screen>
      </Tab.Navigator>

  );
};

function getWidth() {
  let width = Dimensions.get("window").width

  // Horizontal Padding = 20...
  width = width - 80

  // Total five Tabs...
  return width / 5
}

function EmptyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default BottomTabs;
