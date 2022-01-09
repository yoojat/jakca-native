import React from 'react';
import styled from 'styled-components/native';

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: white;
`;

const Wrapper = styled.View``;
const FollowBtn = styled.TouchableOpacity``;
const FollowBtnText = styled.Text``;

interface IProps {
  avatarURL?: string;
  username: string;
  isFollowing: boolean;
  isMe: boolean;
}

export default function UserRow({
  avatarURL,
  username,
  isFollowing,
  isMe,
}: IProps) {
  return (
    <Wrapper>
      <Column>
        <Avatar source={{ uri: avatarURL }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? 'Unfollow' : 'Follow'}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}
