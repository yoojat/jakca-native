import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectPhoto from '../screens/SelectPhoto';
import TakePhoto from '../screens/TakePhoto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition='bottom'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
          top: 0,
        },
      }}
    >
      <Tab.Screen name='SelectScreen'>
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
            }}
          >
            <Stack.Screen
              name='Select'
              options={{ title: 'Choose a photo' }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name='Take' component={TakePhoto} />
    </Tab.Navigator>
  );
}
