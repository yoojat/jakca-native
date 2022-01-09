import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import useMe from '../hooks/useMe';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Me'>;

export default function Me({ navigation }: Props) {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Me</Text>
    </View>
  );
}
