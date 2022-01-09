import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface IProps {
  loading: boolean;
  children: React.ReactNode;
}

export default function ScreenLayout({ loading, children }: IProps) {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loading ? <ActivityIndicator color='white' /> : children}
    </View>
  );
}
