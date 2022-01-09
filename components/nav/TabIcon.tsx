import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  iconName: string;
  color: string;
  focused: boolean;
}

export default function TabIcon({ iconName, color, focused }: IProps) {
  return (
    <Ionicons
      name={focused ? iconName : (`${iconName}-outline` as any)}
      color={color}
      size={22}
    />
  );
}
