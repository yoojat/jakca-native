/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface seeFeed_seeFeed_user {
  __typename: "User";
  username: string;
  avatarURL: string | null;
}

export interface seeFeed_seeFeed_comments_user {
  __typename: "User";
  username: string;
  avatarURL: string | null;
}

export interface seeFeed_seeFeed_comments {
  __typename: "Comment";
  id: number;
  user: seeFeed_seeFeed_comments_user;
  payload: string;
  isMine: boolean;
}

export interface seeFeed_seeFeed {
  __typename: "CoffeeShop";
  id: number;
  photos: seeFeed_seeFeed_photos[];
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: seeFeed_seeFeed_user;
  caption: string;
  comments: (seeFeed_seeFeed_comments | null)[] | null;
  createdAt: string;
  isMine: boolean;
}

export interface seeFeed {
  seeFeed: (seeFeed_seeFeed | null)[] | null;
}

export interface seeFeedVariables {
  offset: number;
}
