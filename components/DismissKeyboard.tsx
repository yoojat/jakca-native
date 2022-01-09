import React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

interface IProps {
  children: React.ReactNode;
}

export default function DismissKeyboard({ children }: IProps) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === 'web'}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
