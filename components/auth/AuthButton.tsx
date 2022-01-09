import React from 'react';
import { GestureResponderEvent, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.blue};
  padding: 15px 10px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

interface IProps {
  onPress: (event: GestureResponderEvent) => void;
  disabled: boolean;
  text: string;
  loading?: boolean;
}

export default function AuthButton({
  onPress,
  disabled,
  text,
  loading,
}: IProps) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color='white' />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
