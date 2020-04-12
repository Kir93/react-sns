import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: '키르',
      },
      content: '첫 번째 게시글',
      img: `https://dimg.donga.com/wps/NEWS/IMAGE/2019/12/22/98915688.2.jpg`,
    },
  ],
};

const Home = () => {
  return (
    <>
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map((c) => {
        return <PostCard key={c} post={c} />;
      })}
    </>
  );
};
export default Home;
