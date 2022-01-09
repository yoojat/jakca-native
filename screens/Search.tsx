import { gql, useLazyQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import { RootStackParamList } from '../types';
import {
  searchCoffeeShops,
  searchCoffeeShopsVariables,
  searchCoffeeShops_searchCoffeeShops,
} from '../__generated__/searchCoffeeShops';

const SEARCH_COFFEESHOPS = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      photos {
        url
      }
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput<{ width: number }>`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

interface IRenderCoffeeShop {
  item: searchCoffeeShops_searchCoffeeShops | null;
}

export default function Search({ navigation }: Props) {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery<
    searchCoffeeShops,
    searchCoffeeShopsVariables
  >(SEARCH_COFFEESHOPS);
  const onValid = ({ keyword }: searchCoffeeShopsVariables) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      style={{ backgroundColor: 'white' }}
      placeholderTextColor='rgba(0, 0, 0, 0.8)'
      placeholder='Search photos'
      autoCapitalize='none'
      returnKeyLabel='Search'
      returnKeyType='search'
      autoCorrect={false}
      onChangeText={(text) => setValue('keyword', text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register('keyword', {
      required: true,
      minLength: 2,
    });
  }, []);

  const renderItem = ({ item: coffeeShop }: IRenderCoffeeShop) => (
    <TouchableOpacity
      onPress={() => {
        if (coffeeShop) {
          navigation.navigate('CoffeeShopScreen', {
            coffeeShopId: coffeeShop.id,
          });
        }
      }}
    >
      <Image
        source={{ uri: coffeeShop ? coffeeShop.photos[0].url : '' }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size='large' />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShops !== undefined ? (
          data?.searchCoffeeShops?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchCoffeeShops}
              keyExtractor={(coffeeShop, index) =>
                '' + (coffeeShop ? coffeeShop.id : index)
              }
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
