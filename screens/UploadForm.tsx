import { gql, useMutation } from '@apollo/client';
import { ReactNativeFile } from 'apollo-upload-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import { RootStackParamList } from '../types';
import {
  uploadCoffeeShop,
  uploadCoffeeShopVariables,
} from '../__generated__/uploadCoffeeShop';

const UPLOAD_COFFEESHOP_MUTATION = gql`
  mutation uploadCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $address: String!
    $caption: String!
    $files: [Upload]!
  ) {
    uploadCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      address: $address
      caption: $caption
      files: $files
    ) {
      id
      user {
        id
        username
        avatarURL
      }
      caption
      createdAt
      isMine
      photos {
        id
        url
      }
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'UploadForm'>;

export default function UploadForm({ route, navigation }: Props) {
  const [uploadPhotoMutation, { loading }] = useMutation<
    uploadCoffeeShop,
    uploadCoffeeShopVariables
  >(UPLOAD_COFFEESHOP_MUTATION, {
    update: (cache, result) => {
      if (result && result.data && result.data.uploadCoffeeShop) {
        const {
          data: { uploadCoffeeShop },
        } = result;
        if (uploadCoffeeShop.id) {
          cache.modify({
            id: 'ROOT_QUERY',
            fields: {
              seeFeed(prev) {
                return [uploadCoffeeShop, ...prev];
              },
            },
          });
          navigation.navigate('Tabs');
        }
      }
    },
  });

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size='small' color='white' style={{ marginRight: 10 }} />
  );
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register('caption');
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const onValid = ({ caption }: any) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: 'image/jpeg',
    });
    uploadPhotoMutation({
      variables: {
        name: '테스트',
        longitude: 'longitude테스트',
        latitude: 'latitude 테스트',
        address: 'address 테스트',
        files: [file],
        caption,
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode='contain' source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            returnKeyType='done'
            placeholder='Write a caption...'
            placeholderTextColor='rgba(0, 0, 0, 0.5)'
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue('caption', text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
