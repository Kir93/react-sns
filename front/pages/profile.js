import React, { useCallback, useEffect, useRef } from 'react';
import NicknameEditForm from '../containers/NicknameEditForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  UNFOLLOW_USER_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
} from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';
import Router from 'next/router';
import FollowList from '../components/FollowList';

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
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    [],
  );
  const onRemovefollower = useCallback(
    (userId) => () => {
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
        const lastId =
          mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id;
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

  useEffect(() => {
    if (!me) {
      alert('로그인 된 사용자는 접근 할 수 없는 페이지 입니다.');
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
  return (
    <>
      <NicknameEditForm />
      <FollowList
        header="팔로잉 목록"
        hasMore={hasMoreFollowing}
        onClickMore={loadMoreFollowings}
        data={followingList}
        onClickStop={onUnfollow}
      />
      <FollowList
        header="팔로워 목록"
        hasMore={hasMoreFollower}
        onClickMore={loadMoreFollowers}
        data={followerList}
        onClickStop={onRemovefollower}
      />
      <div>
        {mainPosts.map((c) => (
          <PostCard key={c.id} post={c} />
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
