import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ReflectionScreen from './ReflectionScreen';
import VideoFrame from './VideoFrame';
import ReflectionTextList from './ReflectionTextList';
import ReflectionTextScreen from './ReflectionTextScreen';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();

const StackScreens = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Daily Readings" component={HomeScreen} />
            <Stack.Screen name="Daily Reflection" component={ReflectionScreen} />
            <Stack.Screen name="Reflection Video" component={VideoFrame} />
            <Stack.Screen name="Daily Reflection Text" component={ReflectionTextList} />
            <Stack.Screen name="Single Reflection" component={ReflectionTextScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
    )
}

export default StackScreens;