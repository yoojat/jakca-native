import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { CREATE_ACCOUNT, LOG_IN } from '../constants';
import { RootStackParamList } from '../types';

const LoginLink = styled.Text`
  color: ${(props) => props.theme.colors.blue};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function Welcome({ navigation }: Props) {
  const goToCreateAccount = () => navigation.navigate(CREATE_ACCOUNT);
  const goToLogIn = () => navigation.navigate(LOG_IN);
  return (
    <AuthLayout>
      <AuthButton
        text='Create New Account'
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
