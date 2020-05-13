import React, { useEffect, useRef } from 'react';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { Card, Avatar } from 'antd';
import { LOAD_USER_REQUEST } from '../reducers/user';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

const User = () => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);
  const countRef = useRef([]);

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
            data: userInfo.id,
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
  }, [mainPosts.length !== 0]);
  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              Post
              <br />
              {userInfo.posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      <div>
        {mainPosts.map((c) => (
          <PostCard key={c.id} post={c} />
        ))}
      </div>
    </div>
  );
};

User.getInitialProps = async (context) => {
  const id = parseInt(context.query.id, 10);
  console.log('User getInitialProps', id);
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: id,
  });
  return { id };
};

export default User;
