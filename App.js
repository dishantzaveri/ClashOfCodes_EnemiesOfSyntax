import React, { useEffect } from 'react';
import { View, Text, StyleSheet, NativeEventEmitter, NativeModules } from 'react-native';
import Home from './components/Home';
import Details from './components/Details';
import colors from './assets/colors/colors';
import { DestinationDetail, Place } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AlanView } from '@alan-ai/alan-sdk-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Tabs from './navigation/tabs';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
// import AuthStack from './navigation/AuthStack';
import Splash from './screens/Splash';
import Location0 from './screens/location0';
import Location2 from './screens/location2';
import Location1 from './screens/location1';
import AddProject from './screens/AddProject';
// import BottomTabs from './screens/bottomtabs';
import Location3 from './screens/location3';
import Search from './screens/search';
import Router from './Router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { CometChat } from '@cometchat-pro/react-native-chat';
import Blogs from './screens/Blogs';
import OpenBlogScreen from './screens/OpenBlogScreen';
import Profile from './components/Profile';
import Profile1 from './components/Profile1';
import Profile2 from './components/Profile2';
import Profile3 from './components/Profile3';
import Face from './screens/face';
import AppStack from './navigation/AppStack';
import Parent from './screens/Parent';
import Chatting from './screens/Chatting';
import LocationTracer from './screens/LocationTracer';
import Options from './screens/Options';
import Ticket from './screens/Ticket';
import Dishant from './components/Dishant';
const app_id = '231614ce9c90ad83';
const region = 'us';
const appSetting = new CometChat.AppSettingsBuilder()
	.subscribePresenceForAllUsers()
	.setRegion(region)
	.build();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
const BlogStack = createNativeStackNavigator();
const ResumeStack = createNativeStackNavigator();
const HomeScreensStack = createNativeStackNavigator();
const MatchScreensStack = createNativeStackNavigator();
const { AlanManager, AlanEventEmitter } = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
const subscription = alanEventEmitter.addListener('command', data => {
	console.log(`got command event ${JSON.stringify(data)}`);
});

const App = () => {
	console.disableYellowBox = true;
	useEffect(() => {
		CometChat.init(app_id, appSetting).then(
			() => {
				console.log('Initialization completed successfully');
				// You can now call login function.
			},
			error => {
				console.log('Initialization failed with error:', error);
				// Check the reason for error and take appropriate action.
			},
		);
	}, []);
	return (

		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="Splash" independent={true}>
				<Stack.Screen
					name="Splash"
					component={Splash}
					options={{ headerShown: false }}></Stack.Screen>
				{/* <Stack.Screen
					name="bottomtabs"
					component={BottomTabs}
					options={{ headerShown: false }}></Stack.Screen> */}
				<Stack.Screen
					name="AddProject"
					component={AddProject}
					options={{ headerShown: false }}></Stack.Screen>
				{/* <Stack.Screen
					name="location0"
					component={Location0}
					options={{ headerShown: false }}></Stack.Screen> */}
				{/* <Stack.Screen
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
					options={{ headerShown: false }}></Stack.Screen> */}

				<Stack.Screen
					name="search"
					component={Search}
					options={{ headerShown: false }}></Stack.Screen>
				{/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}
				<Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
				<Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
				<Stack.Screen name='Dashboard' component={Tabs} options={{ headerShown: false }} />
				<Stack.Screen name='Place' component={Place} options={{ headerShown: false }} />
				<Stack.Screen
					name="Parent"
					component={Parent}
					options={{ headerShown: false }}
				/>
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
				<Stack.Screen
					name="Profile"
					component={Profile}
					options={{ headerShown: false }}
				/>
				{/* <Stack.Screen
					name="Chatting"
					component={Chatting}
					options={{ headerShown: false }}
				/> */}
				<Stack.Screen
					name="Dishant"
					component={Dishant}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Profile1"
					component={Profile1}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Profile2"
					component={Profile2}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Profile3"
					component={Profile3}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="face"
					component={Face}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Options"
					component={Options}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="DestinationDetail"
					component={DestinationDetail}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Ticket"
					component={Ticket}
					options={{ headerShown: false }}
				/>
				<BlogStack.Screen
					name="Blogs"
					component={Blogs}
					screenOptions={{ headerShown: false }}
				/>
				<BlogStack.Screen
					name="OpenBlogScreen"
					component={OpenBlogScreen}
					screenOptions={{ headerShown: false }}
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
