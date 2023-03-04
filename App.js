import React from 'react';
import { View, Text, StyleSheet, NativeEventEmitter, NativeModules } from 'react-native';
import Home from './components/Home';
import Details from './components/Details';
import colors from './assets/colors/colors';
import { Place } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AlanView } from '@alan-ai/alan-sdk-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Tabs from './navigation/tabs';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import AuthStack from './navigation/AuthStack';
import Splash from './screens/Splash';
import Location0 from './screens/location';
import Location2 from './screens/location2';
import Location1 from './screens/location1';
import AddProject from './screens/AddProject';
import BottomTabs from './screens/bottomtabs';
import Location3 from './screens/location3';
import Search from './screens/search';

const Stack = createStackNavigator();
const { AlanManager, AlanEventEmitter } = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
const subscription = alanEventEmitter.addListener('command', data => {
	console.log(`got command event ${JSON.stringify(data)}`);
});

const App = () => {
	return (

		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="Splash" independent={true}>
				<Stack.Screen
					name="Splash"
					component={Splash}
					options={{ headerShown: false }}></Stack.Screen>
				<Stack.Screen
					name="bottomtabs"
					component={BottomTabs}
					options={{ headerShown: false }}></Stack.Screen>
				<Stack.Screen
					name="AddProject"
					component={AddProject}
					options={{ headerShown: false }}></Stack.Screen>
				<Stack.Screen
					name="location"
					component={Location0}
					options={{ headerShown: false }}></Stack.Screen>
				<Stack.Screen
					name="location1"
					component={Location1}
					options={{ headerShown: false }}></Stack.Screen>
				<Stack.Screen
					name="location2"
					component={Location2}
					options={{ headerShown: false }}></Stack.Screen>
				<Stack.Screen
					name="location3"
					component={Location3}
					options={{ headerShown: false }}></Stack.Screen>

				<Stack.Screen
					name="search"
					component={Search}
					options={{ headerShown: false }}></Stack.Screen>
				<Stack.Screen name="AuthStack" component={AuthStack} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
				<Stack.Screen name='Dashboard' component={Tabs} />
				<Stack.Screen name='Place' component={Place} />
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Details"
					component={Details}
					options={{ headerShown: false }}
				/>

			</Stack.Navigator>
			<AlanView
				projectid={
					'ecc5936429f8831a0a3f3bd73ff973822e956eca572e1d8b807a3e2338fdd0dc/stage'
				}
			/>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: colors.white,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});


export default App;
