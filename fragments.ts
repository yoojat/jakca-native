import { gql } from '@apollo/client';

export const COFFEESHOP_FRAGMENT = gql`
  fragment CoffeeShopFragment on CoffeeShop {
    id
    photos {
      url
    }
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;
