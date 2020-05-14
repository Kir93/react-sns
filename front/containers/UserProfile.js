import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { LOG_OUT_REQUEST } from '../reducers/user';
import Link from 'next/link';
import { LoginCard, GridCard, AvatarIcon, Nickname, Span } from './Styles';

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
      <Link href="/profile">
        <a>
          <GridCard>
            포스트
            <Span>{me.post === null ? 0 : me.post.length}</Span>
          </GridCard>
        </a>
      </Link>
      <Link href="/profile">
        <a>
          <GridCard>
            팔로잉
            <Span>{me.following === null ? 0 : me.following.length}</Span>
          </GridCard>
        </a>
      </Link>
      <Link href="/profile">
        <a>
          <GridCard>
            팔로워
            <Span>{me.follower === null ? 0 : me.follower.length}</Span>
          </GridCard>
        </a>
      </Link>
      <GridCard hoverable={false}>
        <Button onClick={onLogout} loading={false}>
          로그아웃
        </Button>
      </GridCard>
    </LoginCard>
  );
};

export default UserProfile;
