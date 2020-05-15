import React from 'react';
import PostForm from '../containers/PostForm';
import PostCard from '../containers/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const countRef = useRef([]);
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
            type: LOAD_MAIN_POSTS_REQUEST,
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
      {me && <PostForm />}
      {mainPosts.map((c) => {
        return <PostCard key={c.id} post={c} />;
      })}
    </>
  );
};

Home.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
