/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShopLikes
// ====================================================

export interface seeCoffeeShopLikes_seeCoffeeShopLikes {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seeCoffeeShopLikes {
  seeCoffeeShopLikes: (seeCoffeeShopLikes_seeCoffeeShopLikes | null)[] | null;
}

export interface seeCoffeeShopLikesVariables {
  id: number;
}
