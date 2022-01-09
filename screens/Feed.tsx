import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import { FlatList } from 'react-native';
import CoffeeShop from '../components/CoffeeShop';
import ScreenLayout from '../components/ScreenLayout';
import {
  seeFeed,
  seeFeedVariables,
  seeFeed_seeFeed,
} from '../__generated__/seeFeed';

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      id
      photos {
        url
      }
      likes
      commentNumber
      isLiked

      user {
        username
        avatarURL
      }
      caption
      comments {
        id
        user {
          username
          avatarURL
        }
        payload
        isMine
      }
      createdAt
      isMine
    }
  }
`;

interface IRenderCoffeeShop {
  item: seeFeed_seeFeed | null;
}

export default function Feed() {
  const { data, loading, fetchMore, refetch } = useQuery<
    seeFeed,
    seeFeedVariables
  >(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderCoffeeShop = ({ item: coffeeShop }: IRenderCoffeeShop) => {
    return (
      coffeeShop && (
        <CoffeeShop
          id={coffeeShop.id}
          user={coffeeShop.user}
          caption={coffeeShop.caption}
          photos={coffeeShop.photos}
          isLiked={coffeeShop.isLiked}
          likes={coffeeShop.likes}
        />
      )
    );
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      {data?.seeFeed && (
        <FlatList
          onEndReachedThreshold={0.05}
          onEndReached={() =>
            fetchMore({
              variables: {
                offset: data?.seeFeed?.length,
              },
            })
          }
          refreshing={refreshing}
          onRefresh={refresh}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
          data={data?.seeFeed}
          keyExtractor={(coffeeShop, index) =>
            '' + (coffeeShop ? coffeeShop.id : index)
          }
          renderItem={renderCoffeeShop}
        />
      )}
    </ScreenLayout>
  );
}
