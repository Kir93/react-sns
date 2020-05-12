import React, { useState } from 'react';
import {
  Card,
  Button,
  Icon,
  Avatar,
  Form,
  Input,
  List,
  Comment,
  Popover,
} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  ADD_COMMENT_REQUEST,
  LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  RETWEET_REQUEST,
  REMOVE_POST_REQUEST,
} from '../reducers/post';
import { useEffect } from 'react';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';

const PostCard = ({ post }) => {
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { me } = useSelector((state) => state.user);

  const liked =
    me && post.likers && post.likers.find((v) => parseInt(v) === me.id);
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

  const onRetweet = useCallback(() => {
    if (!me) {
      return alert('로그인 후 이용하세요.');
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [me && me.id, post && post.id]);

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

  const onRemovePost = useCallback(
    (userId) => () => {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: userId,
      });
    },
    [],
  );

  return (
    <div>
      <Card
        key={+post.createdAt}
        cover={post.src && <PostImages src={post.src} />}
        actions={[
          <Icon type="retweet" key="retweet" onClick={onRetweet} />,
          <Icon
            type="heart"
            key="heart"
            theme={liked ? 'twoTone' : 'outlined'}
            twoToneColor="#eb2f96"
            onClick={onToggleLike}
          />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {me && post.userId === me.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost(post.id)}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <Icon type="ellipsis" />
          </Popover>,
        ]}
        title={
          post.retweetId ? `${post.nickname}님이 리트윗 하셨습니다.` : null
        }
        extra={
          !me || post.userId === me.id ? null : me.following &&
            me.following.find((v) => parseInt(v) === post.userId) ? (
            <Button onClick={onUnfollow(post.userId)}>언팔로우</Button>
          ) : (
            <Button onClick={onFollow(post.userId)}>팔로우</Button>
          )
        }
      >
        {post.retweetId && post.retweet ? (
          <Card
            cover={post.retweet.src && <PostImages src={post.retweet.src} />}
          >
            <Card.Meta
              avatar={
                <Link
                  href={{
                    pathname: '/user',
                    query: { id: post.retweet.UserId },
                  }}
                  as={`/user/${post.retweet.UserId}/posts`}
                >
                  <a>
                    <Avatar>{post.retweet.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.retweet.nickname}
              description={<PostCardContent postData={post.retweet.content} />}
            />
          </Card>
        ) : (
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
            description={<PostCardContent postData={post.content} />}
          />
        )}
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
