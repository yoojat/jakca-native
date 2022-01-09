import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import TabIcon from '../components/nav/TabIcon';
import StackNavFactory from './SharedStackNav';
import { Image, View } from 'react-native';
import useMe from '../hooks/useMe';

// const Tabs = createBottomTabNavigator();
const Tabs = createMaterialBottomTabNavigator();

export default function TabsNav() {
  const { data } = useMe();

  return (
    <Tabs.Navigator
      activeColor='white'
      labeled={false}
      barStyle={{ backgroundColor: 'black' }}
      // screenOptions={{
      //   tabBarInactiveBackgroundColor: 'black',
      //   tabBarActiveBackgroundColor: 'black',
      //   headerShown: false,
      //   tabBarShowLabel: false,
      //   tabBarActiveTintColor: 'white',
      // }}
    >
      <Tabs.Screen
        name='FeedScreen'
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName='home' color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName='Feed' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='SearchScreen'
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={'search'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName='Search' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='Camera'
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Upload');
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={'camera'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='NotificationsScreen'
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={'heart'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName={'Notifications'} />}
      </Tabs.Screen>
      <Tabs.Screen
        name='MeScreen'
        options={{
          tabBarIcon: ({ focused, color }) =>
            data?.me?.avatarURL ? (
              <Image
                source={{ uri: data.me.avatarURL }}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  ...(focused && { borderColor: 'white', borderWidth: 1 }),
                }}
              />
            ) : (
              <TabIcon iconName={'person'} color={color} focused={focused} />
            ),
        }}
      >
        {() => <StackNavFactory screenName='Me' />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
