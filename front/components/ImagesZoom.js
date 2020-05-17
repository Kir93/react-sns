import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { DetailImage, CloseIcon, CarouselDiv, ImageDiv } from './Styles';

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
                <img src={v} alt={v} />
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
