import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { UNFOLLOW_USER_REQUEST, FOLLOW_USER_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onUnfollow = useCallback(
    (userId) => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    [],
  );
  const onFollow = useCallback(
    (userId) => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    [],
  );

  return !me || post.userId === me.id ? null : me.following &&
    me.following.find((v) => parseInt(v) === post.userId) ? (
    <Button onClick={onUnfollow(post.userId)}>언팔로우</Button>
  ) : (
    <Button onClick={onFollow(post.userId)}>팔로우</Button>
  );
};

FollowButton.prototype = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
