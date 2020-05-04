import React, { useState } from 'react';
import { Card, Button, Icon, Avatar, Form, Input, List, Comment } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  ADD_COMMENT_REQUEST,
  LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
} from '../reducers/post';
import { useEffect } from 'react';
import PostImages from './PostImages';

const PostCard = ({ post }) => {
  if (post.src === null) post.src = [];
  if (post.likers === null) post.likers = [];
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { me } = useSelector((state) => state.user);

  const liked =
    me && post.likers && post.likers.find((v) => parseInt(v) === me.id);
  console.log(me, post, liked);
  const { isAddingComment, commentAdded } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onToggleComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev);
    if (!commentFormOpend) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id,
      });
    }
  }, []);

  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      if (!commentText) {
        return alert('글자를 입력하세요.');
      }
      if (!me) {
        return alert('로그인이 필요합니다.');
      }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id,
          content: commentText,
        },
      });
    },
    [me && me.id, commentText],
  );

  const onToggleLike = useCallback(() => {
    if (!me) {
      return alert('로그인 후 이용하세요.');
    }
    if (liked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }
  }, [me && me.id, post && post.id, liked]);

  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <div>
      <Card
        key={+post.createdAt}
        cover={post.src && <PostImages src={post.src} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon
            type="heart"
            key="heart"
            theme={liked ? 'twoTone' : 'outlined'}
            twoToneColor="#eb2f96"
            onClick={onToggleLike}
          />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta
          avatar={
            <Link
              href={{ pathname: '/user', query: { id: post.userId } }}
              as={`/user/${post.userId}/posts`}
            >
              <a>
                <Avatar>{post.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          title={post.nickname}
          description={
            <div>
              {post.content.split(/(#[^\s]+)/g).map((v) => {
                if (v.match(/#[^\s]+/)) {
                  return (
                    <Link
                      href={{
                        pathname: '/hashtag',
                        query: { tag: v.slice(1) },
                      }}
                      as={`/hashtag/${v.slice(1)}`}
                      key={v}
                    >
                      <a>{v}</a>
                    </Link>
                  );
                }
                return v;
              })}
            </div>
          }
        />
      </Card>
      {commentFormOpend && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea
                rows={4}
                value={commentText}
                onChange={onChangeCommentText}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>
              등록
            </Button>
          </Form>
          {console.log(post)}
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.nickname}
                  avatar={
                    <Link
                      href={{ pathname: '/user', query: { id: item.userId } }}
                      as={`/user/${item.userId}/posts`}
                    >
                      <a>
                        <Avatar>{item.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                  datatime={item.createdAt}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};

PostCard.PropTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }).isRequired,
};

export default PostCard;
