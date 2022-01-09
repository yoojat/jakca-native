import { gql, useMutation } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { isLoggedInVar, logUserIn } from '../apollo';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';
import { RootStackParamList } from '../types';
import { login, loginVariables } from '../__generated__/login';

const LOG_IN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

type Props = NativeStackScreenProps<RootStackParamList, 'LogIn'>;
type FomrValue = {
  username: string;
  password: string;
};

export default function LogIn({ route: { params } }: Props) {
  const { register, handleSubmit, setValue, watch } = useForm<FomrValue>({
    defaultValues: {
      password: params?.password,
      username: params?.username,
    },
  });
  const passwordRef = useRef();
  const [logInMutation, { loading, error }] = useMutation<
    login,
    loginVariables
  >(LOG_IN_MUTATION, {
    onCompleted: async (data) => {
      const {
        login: { ok, token },
      } = data;
      if (ok) {
        await logUserIn(token || '');
      }
    },
  });
  const onNext = (nextOne: any) => {
    nextOne?.current?.focus();
  };
  const onValid = (data: any) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register('username');
    register('password');
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        value={watch('username')}
        placeholder='Username'
        returnKeyType='next'
        autoCapitalize='none'
        placeholderTextColor={'#241f1f99'}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue('username', text)}
      />
      <TextInput
        value={watch('password')}
        ref={passwordRef as any}
        placeholder='Password'
        secureTextEntry
        returnKeyType='done'
        lastOne={true}
        placeholderTextColor={'rgba(255,255,255, 0.6)'}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue('password', text)}
      />
      <AuthButton
        text='Log In'
        loading={loading}
        disabled={!watch('username') || !watch('password')}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
