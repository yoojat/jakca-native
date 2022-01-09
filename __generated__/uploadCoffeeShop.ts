/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: uploadCoffeeShop
// ====================================================

export interface uploadCoffeeShop_uploadCoffeeShop_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
}

export interface uploadCoffeeShop_uploadCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface uploadCoffeeShop_uploadCoffeeShop {
  __typename: "CoffeeShop";
  id: number;
  user: uploadCoffeeShop_uploadCoffeeShop_user;
  caption: string;
  createdAt: string;
  isMine: boolean;
  photos: uploadCoffeeShop_uploadCoffeeShop_photos[];
}

export interface uploadCoffeeShop {
  uploadCoffeeShop: uploadCoffeeShop_uploadCoffeeShop | null;
}

export interface uploadCoffeeShopVariables {
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  caption: string;
}
