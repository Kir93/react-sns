import React, { useState } from 'react';
import { Card, Button, Icon, Avatar, Form, Input, List, Comment } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { ADD_COMMENT_REQUEST } from '../reducers/post';
import { useEffect } from 'react';

const PostCard = ({ post }) => {
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { me } = useSelector((state) => state.user);
  const { isAddingComment, commentAdded } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onToggleComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev);
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
        },
      });
    },
    [me && me.id, commentText],
  );

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
        cover={post.img && <img alt="example" src={post.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
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
  }),
};

export default PostCard;
