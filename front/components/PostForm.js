import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
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
  const imageInput = useRef();

  useEffect(() => {
    setText('');
  }, [postAdded === true]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!text || !text.trim()) {
        return alert('글자를 입력하세요.');
      }
      return dispatch({
        type: ADD_POST_REQUEST,
        data: {
          content: text,
        },
      });
    },
    [text],
  );

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onChangeImages = useCallback((e) => {
    return console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onClickImagesUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <InputPost encType="multipart/form-data" onSubmit={onSubmitForm}>
      <Input.TextArea
        maxLength={140}
        placeholder="당신의 일상을 기록하세요."
        onChange={onChangeText}
        value={text}
      />
      <div>
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImagesUpload}>이미지 업로드</Button>
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
