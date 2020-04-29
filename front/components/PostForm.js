import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useCallback } from 'react';
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from '../reducers/post';
const InputPost = styled(Form)`
  margin-bottom: 30px;
`;

const ImageRow = styled(Row)`
  margin-top: 30px;
`;

const PostBtn = styled(Button)`
  float: right;
`;

const PostImg = styled.img`
  width: 100%;
`;

const RemoveBtn = styled(Button)`
  margin-top: 10px;
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
      console.log(imagePaths);
      return dispatch({
        type: ADD_POST_REQUEST,
        data: {
          content: text,
          images: imagePaths,
        },
      });
    },
    [text, imagePaths],
  );

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onChangeImages = useCallback(
    (e) => {
      console.log(e.target.files);
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
      });
      dispatch({
        type: UPLOAD_IMAGES_REQUEST,
        data: imageFormData,
      });
    },
    [imagePaths],
  );

  const onClickImagesUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    [],
  );

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
      <ImageRow gutter={16}>
        {imagePaths.map((v, i) => {
          return (
            <Col key={v} style={{ display: 'inline-block' }} xs={12} md={6}>
              <div>
                <PostImg src={`http://localhost:3065/uploads/` + v} alt={v} />
                <div>
                  <RemoveBtn onClick={onRemoveImage(i)}>제거</RemoveBtn>
                </div>
              </div>
            </Col>
          );
        })}
      </ImageRow>
    </InputPost>
  );
};

export default PostForm;
