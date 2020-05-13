import React, { useCallback, useEffect, useRef } from 'react';
import { List, Button, Card, Icon } from 'antd';
import styled from 'styled-components';
import NicknameEditForm from '../components/NicknameEditForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  UNFOLLOW_USER_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
} from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const ProfileList = styled(List)`
  margin-bottom: 20px;
  text-align: center;
`;

const More = styled(Button)`
  width: 100%;
  // border: 0;
  // border-top: 1px solid #d9d9d9;
`;

const ListItem = styled(List.Item)`
  margin-top: 20px;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const {
    me,
    followerList,
    followingList,
    hasMoreFollower,
    hasMoreFollowing,
  } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const countRef = useRef([]);

  const onUnfollow = useCallback(
    (userId) => () => {
      console.log(userId);
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    [],
  );
  const onRemovefollower = useCallback(
    (userId) => () => {
      console.log(userId);
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: userId,
      });
    },
    [],
  );

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length,
    });
  }, [followingList.length]);

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length,
    });
  }, [followerList.length]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: me.id,
            lastId: lastId,
          });
        }
        countRef.current.push(lastId);
      }
    }
  }, [mainPosts, hasMorePost]);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  return (
    <>
      <NicknameEditForm />
      <ProfileList
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={
          hasMoreFollowing && <More onClick={loadMoreFollowings}>더보기</More>
        }
        bordered
        dataSource={followingList}
        renderItem={(item) => (
          <ListItem>
            <Card
              actions={[
                <Icon key="stop" type="stop" onClick={onUnfollow(item.id)} />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </ListItem>
        )}
      />
      <ProfileList
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={
          hasMoreFollower && <More onClick={loadMoreFollowers}>더보기</More>
        }
        bordered
        dataSource={followerList}
        renderItem={(item) => (
          <ListItem>
            <Card
              actions={[
                <Icon
                  key="stop"
                  type="stop"
                  onClick={onRemovefollower(item.id)}
                />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </ListItem>
        )}
      />
      <div>
        {mainPosts.map((c) => (
          <PostCard key={+c.createdAt} post={c} />
        ))}
      </div>
    </>
  );
};

Profile.getInitialProps = async (context) => {
  const state = context.store.getState();
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
};

export default Profile;
