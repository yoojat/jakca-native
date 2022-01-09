import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Image, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { seeFeed_seeFeed_photos } from '../__generated__/seeFeed';
import { COMMENTS, PROFILE } from '../constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { gql, useMutation } from '@apollo/client';
import { toggleLike, toggleLikeVariables } from '../__generated__/toggleLike';

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: white;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;

interface IProps {
  id: number;
  user: {
    avatarURL?: string | null;
    username: string;
  };
  caption?: string;
  photos: seeFeed_seeFeed_photos[];
  isLiked: boolean;
  likes: number;
  commentNumber: number;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

function CoffeeShop({ id, user, caption, photos, isLiked, likes }: IProps) {
  const navigation = useNavigation<NavigationProp>();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  useEffect(() => {
    Image.getSize(photos[0].url, (width, height) => {
      setImageHeight(height / 3);
    });
  }, [photos]);

  const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id,
      },
      update: (cache, result) => {
        if (result.data && result.data.toggleLike) {
          const {
            data: {
              toggleLike: { ok },
            },
          } = result;
          if (ok) {
            const coffeeShopId = `CoffeeShop:${id}`;
            cache.modify({
              id: coffeeShopId,
              fields: {
                isLiked(prev) {
                  return !prev;
                },
                likes(prev) {
                  if (isLiked) {
                    return prev - 1;
                  }
                  return prev + 1;
                },
              },
            });
          }
        }
      },
    }
  );

  return (
    <Container>
      <Header onPress={() => navigation.navigate(PROFILE)}>
        <UserAvatar resizeMode='cover' source={{ uri: user.avatarURL || '' }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        style={{
          width,
          height: imageHeight,
        }}
        source={{ uri: photos[0].url }}
      />
      <ExtraContainer>
        <Actions>
          <Action onPress={() => toggleLikeMutation()}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              color={isLiked ? 'tomato' : 'white'}
              size={22}
            />
          </Action>
          <Action onPress={() => navigation.navigate(COMMENTS)}>
            <Ionicons name='chatbubble-outline' color='white' size={22} />
          </Action>
        </Actions>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Likes', {
              coffeeShopId: id,
            })
          }
        >
          <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
}

export default CoffeeShop;
