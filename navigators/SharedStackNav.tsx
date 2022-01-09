import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Me from '../screens/Me';
import { Image } from 'react-native';
import CoffeeShopScreen from '../screens/CoffeeShopScreen';
import Likes from '../screens/Likes';
import Comments from '../screens/Comments';

const Stack = createStackNavigator();

interface IProps {
  screenName: string;
}

export default function SharedStackNav({ screenName }: IProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          borderBottomColor: 'rgba(255, 255, 255, 0.3)',
          shadowColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'black',
        },
        headerTitle: '',
      }}
    >
      {screenName === 'Feed' ? (
        <Stack.Screen
          name={'Feed'}
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode='contain'
                source={require('../assets/logo.png')}
              />
            ),
          }}
        />
      ) : null}
      {screenName === 'Search' ? (
        <Stack.Screen name={'Search'} component={Search} />
      ) : null}
      {screenName === 'Notifications' ? (
        <Stack.Screen name={'Notifications'} component={Notifications} />
      ) : null}
      {screenName === 'Me' ? <Stack.Screen name={'Me'} component={Me} /> : null}
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='CoffeeShopScreen' component={CoffeeShopScreen} />
      <Stack.Screen name='Likes' component={Likes} />
      <Stack.Screen name='Comments' component={Comments} />
    </Stack.Navigator>
  );
}
