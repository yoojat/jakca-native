import { gql, useQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CoffeeShop from '../components/CoffeeShop';
import ScreenLayout from '../components/ScreenLayout';
import { RootStackParamList } from '../types';
import {
  seeCoffeeShop,
  seeCoffeeShopVariables,
} from '../__generated__/seeCoffeeShop';

type Props = NativeStackScreenProps<RootStackParamList, 'CoffeeShopScreen'>;

const SEE_COFFEESHOP = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      photos {
        url
      }
      likes
      commentNumber
      isLiked
      user {
        id
        username
        avatarURL
      }
      caption
    }
  }
`;

export default function CoffeeShopScreen({ route }: Props) {
  const { data, loading, refetch } = useQuery<
    seeCoffeeShop,
    seeCoffeeShopVariables
  >(SEE_COFFEESHOP, {
    variables: {
      id: route?.params?.coffeeShopId,
    },
  });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: 'black' }}
        contentContainerStyle={{
          backgroundColor: 'black',

          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data && data.seeCoffeeShop && (
          <CoffeeShop
            id={data.seeCoffeeShop.id}
            user={data.seeCoffeeShop.user}
            caption={data.seeCoffeeShop.caption}
            photos={data.seeCoffeeShop.photos}
            isLiked={data.seeCoffeeShop.isLiked}
            commentNumber={data.seeCoffeeShop.commentNumber}
            likes={data.seeCoffeeShop.likes}
          />
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
