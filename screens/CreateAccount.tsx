import React, { useEffect, useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import {
  createAccount,
  createAccountVariables,
} from '../__generated__/createAccount';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($username: String!, $password: String!) {
    createAccount(username: $username, password: $password) {
      ok
      error
    }
  }
`;

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

type FormValue = {
  username: string;
  password: string;
};

export default function CreateAccount({ navigation }: Props) {
  const { register, handleSubmit, setValue, getValues } = useForm<FormValue>();

  const [createAccountMutation, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      const {
        createAccount: { ok },
      } = data;

      const { username, password } = getValues();

      if (ok) {
        navigation.navigate('LogIn', {
          username,
          password,
        });
      }
    },
  });

  const usernameRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne: any) => {
    nextOne?.current?.focus();
  };

  const onValid = (data: any) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register('username', { required: true });
    register('password', { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        ref={usernameRef as any}
        placeholder='Username'
        autoCapitalize='none'
        returnKeyType='next'
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={'rgba(255,255,255,0.6)'}
        onChangeText={(text) => setValue('username', text)}
      />

      <TextInput
        ref={passwordRef as any}
        placeholder='Password'
        secureTextEntry
        returnKeyType='done'
        lastOne={true}
        placeholderTextColor={'rgba(255,255,255,0.6)'}
        onChangeText={(text) => setValue('password', text)}
        onSubmitEditing={handleSubmit(onValid)}
      />

      <AuthButton
        text='Create Account'
        disabled={false}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
