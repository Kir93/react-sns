import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ADD_COMMENT_REQUEST } from '../reducers/post';
import { Form, Input, Button } from 'antd';

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useState('');
  const { isAddingComment, commentAdded } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      if (!commentText) return alert('글자를 입력하세요.');
      if (!me) return alert('로그인이 필요합니다.');
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

  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
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
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
