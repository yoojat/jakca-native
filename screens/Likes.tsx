import { gql, useQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import UserRow from '../components/UserRow';
import { RootStackParamList } from '../types';
import {
  seeCoffeeShopLikes,
  seeCoffeeShopLikesVariables,
  seeCoffeeShopLikes_seeCoffeeShopLikes,
} from '../__generated__/seeCoffeeShopLikes';

const LIKES_QUERY = gql`
  query seeCoffeeShopLikes($id: Int!) {
    seeCoffeeShopLikes(id: $id) {
      id
      username
      avatarURL
      isFollowing
      isMe
    }
  }
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Likes'>;
interface IRenderUser {
  item: seeCoffeeShopLikes_seeCoffeeShopLikes | null;
}

export default function Likes({ route }: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery<
    seeCoffeeShopLikes,
    seeCoffeeShopLikesVariables
  >(LIKES_QUERY, {
    variables: {
      id: route?.params?.coffeeShopId,
    },
    skip: !route?.params?.coffeeShopId,
  });

  const renderUser = ({ item: user }: IRenderUser) =>
    user && (
      <UserRow
        avatarURL={user.avatarURL || ''}
        username={user.username}
        isFollowing={user.isFollowing}
        isMe={user.isMe}
      />
    );
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seeCoffeeShopLikes}
        keyExtractor={(item, index) => '' + (item ? item.id : index)}
        renderItem={renderUser}
        style={{ width: '100%' }}
      />
    </ScreenLayout>
  );
}
