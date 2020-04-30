import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styled from 'styled-components';
import { useCallback } from 'react';
import ImagesZoom from './ImagesZoom';

const Img = styled.img`
  width: 50%;
`;

const MoreImg = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  vertical-align: middle;
`;

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
        <img src={`http://localhost:3065/uploads/${src[0]}`} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom src={src} onClose={onClose} />}
      </>
    );
  }
  if (src.length === 2) {
    return (
      <>
        <div>
          <Img
            src={`http://localhost:3065/uploads/${src[0]}`}
            onClick={onZoom}
          />
          <Img
            src={`http://localhost:3065/uploads/${src[1]}`}
            onClick={onZoom}
          />
        </div>
        {showImagesZoom && <ImagesZoom src={src} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <Img src={`http://localhost:3065/uploads/${src[0]}`} onClick={onZoom} />
        <MoreImg onClick={onZoom}>
          <Icon type="plus" />
          <br />
          {src.length - 1} 개의 사진 더보기
        </MoreImg>
      </div>
      {showImagesZoom && <ImagesZoom src={src} onClose={onClose} />}
    </>
  );
};

PostImages.prototype = {
  src: PropTypes.string.isRequired,
};

export default PostImages;
