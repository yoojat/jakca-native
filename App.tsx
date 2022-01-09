import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance } from 'react-native';
import { darkTheme, lightTheme } from './styles';
import { ThemeProvider } from 'styled-components';
import client, { isLoggedInVar, tokenVar, cache } from './apollo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import LoggedInNav from './navigators/LoggedInNav';
import {
  AsyncStorageWrapper,
  CachePersistor,
  persistCache,
} from 'apollo3-cache-persist';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarMode] = useState(
    Appearance.getColorScheme() === 'dark'
  );
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require('./assets/logo.png')];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    // await persistCache({
    //   cache,
    //   storage: new AsyncStorageWrapper(AsyncStorage),
    // });
    const persistor = new CachePersistor({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    });
    await persistor.restore();

    return preloadAssets();
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  Appearance.addChangeListener(({ colorScheme }) => {
    if (colorScheme === 'dark') {
      setIsDarMode(true);
    } else {
      setIsDarMode(false);
    }
  });
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
