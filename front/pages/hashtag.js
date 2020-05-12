import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';
import { useCallback } from 'react';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const onScroll = useCallback(() => {
    console.log(
      window.scrollY,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
    );
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          data: tag,
          lastId: mainPosts[mainPosts.length - 1].id,
        });
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
      {mainPosts.map((c) => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = async (context) => {
  const tag = context.query.tag;
  console.log('hashtag getInitialProps', tag);
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
  });
  return { tag };
};

export default Hashtag;
