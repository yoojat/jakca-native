import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import * as MediaLibrary from 'expo-media-library';
import styled from 'styled-components/native';
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'SelectPhoto'>;

export default function SelectPhoto({ navigation }: Props) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [chosenPhoto, setChosenPhoto] = useState('');
  const [photoInfoUri, setPhotoInfoUri] = useState('');

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };
  const getPermissions = async () => {
    // const temp = await MediaLibrary.getPermissionsAsync();
    // console.log({ temp });
    const { granted, accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (granted === false && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== 'none') {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== 'none') {
      setOk(true);
      getPhotos();
    }
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UploadForm', {
          file: chosenPhoto,
          photoInfoUri,
        });
      }}
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    getPermissions();
  }, [ok]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto, photoInfoUri]);

  const numColumns = 4;
  const { width } = useWindowDimensions();

  const choosePhoto = async (id: string) => {
    const info = await MediaLibrary.getAssetInfoAsync(id);
    setChosenPhoto(info.uri);
    setPhotoInfoUri(info.localUri || '');
  };
  const renderItem = ({ item: photo }: any) => (
    <ImageContainer onPress={() => choosePhoto(photo.id)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name='checkmark-circle'
          size={18}
          color={photo.uri === chosenPhoto ? 'blue' : 'white'}
        />
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== '' ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: '100%' }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
