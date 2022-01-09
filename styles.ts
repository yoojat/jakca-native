import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    // colors: {
    //   main: string;
    //   secondary: string;
    //   blue: string;
    // };
    colors: {
      blue: string;
      accent?: string;
      bgColor: string;
      fontColor: string;
      borderColor?: string;
    };
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    blue: '#0095F6',
    accent: '#0095f6',
    bgColor: '#FAFAFA',
    fontColor: 'rgb(38, 38, 38)',
    borderColor: 'rgb(219,219,219)',
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    blue: '#0095F6',
    fontColor: 'lightGray',
    bgColor: '#000',
  },
};
