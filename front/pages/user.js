import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { Card, Avatar } from 'antd';
import { LOAD_USER_REQUEST } from '../reducers/user';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';

const User = ({ id }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id,
    });
  }, []);
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
          <PostCard key={+c.createdAt} post={c} />
        ))}
      </div>
    </div>
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};

User.getInitialProps = async (context) => {
  console.log('User getInitialProps', context.query.id);
  return { id: parseInt(context.query.id, 10) };
};

export default User;
