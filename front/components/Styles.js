import styled from 'styled-components';
import { Icon, Menu, Row, Input } from 'antd';

// AppLayout.js
export const HeadBox = styled(Row)`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 50px;
`;
export const Header = styled(Menu)`
  border-bottom: 0;
`;
export const MenuItem = styled(Menu.Item)`
  @media only screen and (max-width: 576px) {
    width: 20%;
  }
`;
export const SearchMenu = styled(Menu.Item)`
  @media only screen and (max-width: 576px) {
    width: 60%;
  }
`;
export const SearchBar = styled(Input.Search)`
  vertical-align: middle;
`;

// ImagesZoom.js
export const DetailImage = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
export const CloseIcon = styled(Icon)`
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
export const CarouselDiv = styled.div`
  height: 100%;
  background-color: #090909;
  & .slick-dots li.slick-active button:before {
    color: #1890ff !important;
  }
  & .slick-dots li button:before {
    color: white !important;
  }
`;
export const ImageDiv = styled.div`
  padding: 3rem;
  padding-top: 8rem;
  text-align: center;
  @media only screen and (max-width: 576px) {
    padding-top: 15rem;
  }
  & img {
    margin: 0 auto;
    max-width: 100%;
    max-height: 45rem;
    @media only screen and (max-width: 576px) {
      max-height: 30rem;
    }
  }
`;

// PostImages.js
export const SoloImg = styled.img`
  width: 100%;
`;
export const ImageBox = styled.div`
  height: 15rem;
  & img {
    width: 50%;
    height: 100%;
    object-fit: cover;
  }
  & div {
    display: inline-block;
    width: 50%;
    text-align: center;
    vertical-align: middle;
  }
`;
