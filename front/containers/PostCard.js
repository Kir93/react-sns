import React, { useState, memo } from 'react';
import { Card, Button, Icon, Avatar, List, Comment, Popover } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  RETWEET_REQUEST,
  REMOVE_POST_REQUEST,
} from '../reducers/post';
import PostImages from '../components/PostImages';
import PostCardContent from '../components/PostCardContent';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';

const PostCard = memo(({ post }) => {
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const id = useSelector((state) => state.user.me && state.user.me.id);
  const liked =
    id && post.likers && post.likers.find((v) => parseInt(v) === id);
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

  const onToggleLike = useCallback(() => {
    if (!id) {
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
  }, [id, post && post.id, liked]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인 후 이용하세요.');
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id, post && post.id]);

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
                {id && post.userId === id ? (
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
        extra={<FollowButton post={post} />}
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
          <CommentForm post={post} />
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li style={{ listStyle: 'none' }}>
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
});

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
