import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { ADD_POST_REQUEST } from '../reducers/post';
const InputPost = styled(Form)`
  margin-bottom: 30px;
`;

const PostBtn = styled(Button)`
  float: right;
`;

const PostImg = styled.img`
  width: 200px;
`;

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { imagePaths, isAddingPost, postAdded } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    setText('');
  }, [postAdded === true]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!text) {
        return alert('글자를 입력하세요.');
      }
      return dispatch({
        type: ADD_POST_REQUEST,
        data: {
          text,
        },
      });
    },
    [text],
  );

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <InputPost encType="multiple" onSubmit={onSubmitForm}>
      <Input.TextArea
        maxLength={140}
        placeholder="당신의 일상을 기록하세요."
        onChange={onChangeText}
        value={text}
      />
      <div>
        <input type="text" multiple hidden />
        <Button>이미지 업로드</Button>
        <PostBtn type="primary" htmlType="submit" loading={isAddingPost}>
          POST
        </PostBtn>
      </div>
      <div>
        {imagePaths.map((v) => {
          return (
            <div key={v} style={{ display: 'inline-block' }}>
              <PostImg src={`http://localhost:3065/` + v} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          );
        })}
      </div>
    </InputPost>
  );
};

export default PostForm;
