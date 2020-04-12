import React from 'react';
import styled from 'styled-components';
import { Avatar, Button, Card } from 'antd';

const LoginCard = styled(Card)`
  border: 0;
  margin-top: 5px;
  margin-right: 40px;
  & .ant-card-body {
    padding: 0;
  }
`;

const GridCard = styled(Card.Grid)`
  width: 20%;
  padding: 0;
  text-align: center;
  box-shadow: none;
  line-height: 50px;
`;

const Span = styled.span`
  color: #1890ff;
`;

const dummy = {
  nickname: 'Kir',
  Post: [],
  Followings: [],
  Followers: [],
  isLogedIn: false,
};

const UserProfile = () => {
  return (
    <LoginCard>
      <GridCard hoverable={false}>
        <Avatar>{dummy.nickname[0]}</Avatar>
      </GridCard>
      <GridCard>
        포스트 <Span>{dummy.Post.length}</Span>
      </GridCard>
      <GridCard>
        팔로잉 <Span>{dummy.Followings.length}</Span>
      </GridCard>
      <GridCard>
        팔로워 <Span>{dummy.Followers.length}</Span>
      </GridCard>
      <GridCard hoverable={false}>
        <Button loading={false}>로그아웃</Button>
      </GridCard>
    </LoginCard>
  );
};

export default UserProfile;
