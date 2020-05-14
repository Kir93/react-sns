import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { useCallback } from 'react';
import ImagesZoom from './ImagesZoom';
import { SoloImg, ImageBox } from './Styles';

const PostImages = ({ src }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if (src.length === 1) {
    return (
      <>
        <SoloImg
          src={`http://58.236.217.124:3065/uploads/${src[0]}`}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom src={src} onClose={onClose} />}
      </>
    );
  }
  if (src.length === 2) {
    return (
      <>
        <ImageBox>
          <img
            src={`http://58.236.217.124:3065/uploads/${src[0]}`}
            onClick={onZoom}
          />
          <img
            src={`http://58.236.217.124:3065/uploads/${src[1]}`}
            onClick={onZoom}
          />
        </ImageBox>
        {showImagesZoom && <ImagesZoom src={src} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <ImageBox>
        <img
          src={`http://58.236.217.124:3065/uploads/${src[0]}`}
          onClick={onZoom}
        />
        <div onClick={onZoom}>
          <Icon type="plus" />
          <br />
          {src.length - 1} 개의 사진 더보기
        </div>
      </ImageBox>
      {showImagesZoom && <ImagesZoom src={src} onClose={onClose} />}
    </>
  );
};

PostImages.prototype = {
  src: PropTypes.string.isRequired,
};

export default PostImages;
