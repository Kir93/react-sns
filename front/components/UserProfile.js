import React from 'react';
import styled from 'styled-components';
import { Avatar, Button, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { logoutAction } from '../reducers/user';

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

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction);
  }, []);
  return (
    <LoginCard>
      <GridCard hoverable={false}>
        <Avatar>{user.nickname[0]}</Avatar>
      </GridCard>
      <GridCard>
        포스트 <Span>{user.Post.length}</Span>
      </GridCard>
      <GridCard>
        팔로잉 <Span>{user.Followings.length}</Span>
      </GridCard>
      <GridCard>
        팔로워 <Span>{user.Followers.length}</Span>
      </GridCard>
      <GridCard hoverable={false}>
        <Button onClick={onLogout} loading={false}>
          로그아웃
        </Button>
      </GridCard>
    </LoginCard>
  );
};

export default UserProfile;
