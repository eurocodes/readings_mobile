import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackScreens from './screens/StackScreen';
import ReflectionScreen from './screens/ReflectionScreen';
import DrawerContent from './screens/DrawerContent';

export default function App() {

  const Drawer = createDrawerNavigator();


  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerType="back"
        drawerContent={props => <DrawerContent {...props} />}

      >
        <Drawer.Screen name="Home" component={StackScreens} />
        <Drawer.Screen name="Stack Home" component={ReflectionScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
