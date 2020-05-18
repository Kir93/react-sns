import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Input, Col } from 'antd';
import { PostBtn, ImageRow, InputPost } from './Styles';
import { useCallback } from 'react';
import {
  UPLOAD_IMAGES_REQUEST,
  EDIT_REMOVE_IMAGE,
  EDIT_IMAGE,
  CANCLED_EDIT_POST,
  EDIT_POST_REQUEST,
} from '../reducers/post';

const EditPostForm = ({ post, finishEdit }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(post.content);
  const { editImagePaths, isAddingImage } = useSelector((state) => state.post);
  const imageInput = useRef();
  useEffect(() => {
    if (post.src) {
      dispatch({
        type: EDIT_IMAGE,
        data: post.src,
      });
    }
  }, [post.src]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!text || !text.trim()) {
        return alert('글자를 입력하세요.');
      }
      dispatch({
        type: EDIT_POST_REQUEST,
        id: post.id,
        data: {
          content: text,
          images: editImagePaths,
        },
      });
      finishEdit();
    },
    [text, editImagePaths],
  );

  const onEdittingCancled = useCallback(() => {
    dispatch({
      type: CANCLED_EDIT_POST,
    });
    finishEdit();
  }, [finishEdit]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onChangeImages = useCallback(
    (e) => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
      });
      dispatch({
        type: UPLOAD_IMAGES_REQUEST,
        data: imageFormData,
        id: post.id,
      });
    },
    [editImagePaths],
  );

  const onClickImagesUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: EDIT_REMOVE_IMAGE,
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
          accept="image/*"
          capture
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImagesUpload} loading={isAddingImage}>
          이미지 업로드
        </Button>
        <PostBtn
          type="danger"
          style={{ marginLeft: '5px' }}
          onClick={onEdittingCancled}
        >
          취소
        </PostBtn>
        <PostBtn type="primary" htmlType="submit">
          POST
        </PostBtn>
      </div>
      <ImageRow gutter={16}>
        {editImagePaths.map((v, i) => {
          return (
            <Col key={v} style={{ display: 'inline-block' }} xs={12} md={6}>
              <div>
                <img src={v} alt={v} />
                <div>
                  <Button onClick={onRemoveImage(i)}>제거</Button>
                </div>
              </div>
            </Col>
          );
        })}
      </ImageRow>
    </InputPost>
  );
};

EditPostForm.prototype = {
  post: PropTypes.object.isRequired,
  edittingPostFrom: PropTypes.bool.isRequired,
};

export default EditPostForm;
