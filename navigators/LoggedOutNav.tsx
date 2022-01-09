import React from 'react';
import Welcome from '../screens/Welcome';
import LogIn from '../screens/LogIn';
import CreateAccount from '../screens/CreateAccount';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WELCOME } from '../constants';

const Stack = createNativeStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: 'white',
        headerTitle: '',
      }}
    >
      <Stack.Screen
        name={WELCOME}
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen name='LogIn' component={LogIn} />
      <Stack.Screen name='CreateAccount' component={CreateAccount} />
    </Stack.Navigator>
  );
}
