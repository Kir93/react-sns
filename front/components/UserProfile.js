import React from 'react';
import styled from 'styled-components';
import { Avatar, Button, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { logoutAction, LOG_OUT_REQUEST } from '../reducers/user';

const LoginCard = styled(Card)`
  border: 0;
  margin-top: 5px;
  margin-right: 40px;
  & .ant-card-body {
    padding: 0;
  }
`;
const AvatarIcon = styled(Avatar)`
  margin-top: -5px;
`;
const GridCard = styled(Card.Grid)`
  width: 20%;
  padding: 0;
  text-align: center;
  box-shadow: none;
  line-height: 50px;
`;
const Nickname = styled.span`
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
  @media only screen and (max-width: 576px) {
    display: none;
  }
`;
const Span = styled.span`
  color: #1890ff;
  padding-left: 10px;
  @media only screen and (max-width: 576px) {
    padding-left: 0px;
    display: block;
    line-height: 0px;
    padding-bottom: 20px;
  }
`;

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);
  return (
    <LoginCard>
      <GridCard hoverable={false}>
        <AvatarIcon>{me.nickname[0]}</AvatarIcon>
        <Nickname>{me.nickname}</Nickname>
      </GridCard>
      <GridCard>
        포스트
        <Span>{me.posts.length}</Span>
      </GridCard>
      <GridCard>
        팔로잉
        <Span>{me.followers.length}</Span>
      </GridCard>
      <GridCard>
        팔로워
        <Span>{me.followings.length}</Span>
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
