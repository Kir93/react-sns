import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Slick from 'react-slick';
import styled from 'styled-components';
import { useCallback } from 'react';

const DetailImage = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  z-index: 10000;
  font-size: 1.2rem;
  right: 0;
  top: 0;
  padding: 1rem;
  line-height: 1.5rem;
  cusor: pointer;
  color: white;
`;

const CarouselDiv = styled.div`
  height: 100%;
  background-color: #090909;
  & .slick-dots li.slick-active button:before {
    color: #1890ff !important;
  }
  & .slick-dots li button:before {
    color: white !important;
  }
`;

const ImageDiv = styled.div`
  padding: 3rem;
  text-align: center;
`;

const Image = styled.img`
  margin: 0 auto;
  max-width: 100%;
  max-height: 50rem;
`;

const ImagesZoom = ({ src, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <DetailImage>
      <CloseIcon type="close" theme="outlined" onClick={onClose} />
      <CarouselDiv>
        <Slick
          dots={true}
          initialSlide={0}
          afterChange={(slide) => setCurrentSlide(slide)}
          infinite={false}
          arrows
          slidesToShow={1}
          slidesToScroll={1}
        >
          {src.map((v) => {
            return (
              <ImageDiv>
                <Image src={`http://localhost:3065/uploads/${v}`} alt={v} />
              </ImageDiv>
            );
          })}
        </Slick>
      </CarouselDiv>
    </DetailImage>
  );
};

ImagesZoom.prototype = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;