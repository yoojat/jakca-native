/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShop
// ====================================================

export interface seeCoffeeShop_seeCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface seeCoffeeShop_seeCoffeeShop_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
}

export interface seeCoffeeShop_seeCoffeeShop {
  __typename: "CoffeeShop";
  id: number;
  photos: seeCoffeeShop_seeCoffeeShop_photos[];
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: seeCoffeeShop_seeCoffeeShop_user;
  caption: string;
}

export interface seeCoffeeShop {
  seeCoffeeShop: seeCoffeeShop_seeCoffeeShop | null;
}

export interface seeCoffeeShopVariables {
  id: number;
}
