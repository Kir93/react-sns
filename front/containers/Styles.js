import styled from 'styled-components';
import { Card, Avatar, Button, Form, Input, Row } from 'antd';

// LoginForm.js
export const LoginMenu = styled(Form)`
  padding-top: 5px;
  text-align: center;
`;
export const InputFrom = styled(Form.Item)`
  @media only screen and (max-width: 576px) {
    display: block !important;
    margin-left: 16px;
  }
  & button {
    vertical-align: middle;
    @media only screen and (max-width: 576px) {
      width: 49%;
      margin-bottom: 5px;
    }
  }
`;
export const Signup = styled(Button)`
  margin-left: 5px;
`;

// NicknameEditFrom.js
export const NicknameForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;

  button {
    width: 19%;
    margin-left: 1%;
    top: 1px;
  }
`;
export const NicknameInput = styled(Input)`
  width: 80%;
`;

// PostForm.js
export const InputPost = styled(Form)`
  margin-bottom: 30px;
`;
export const PostBtn = styled(Button)`
  float: right;
`;
export const ImageRow = styled(Row)`
  margin-top: 30px;
  & img {
    width: 100%;
  }
  & button {
    margin-top: 10px;
  }
`;
// UserProfile.js
export const LoginCard = styled(Card)`
  border: 0;
  margin-top: 5px;
  margin-right: 40px;
  & .ant-card-body {
    padding: 0;
  }
  & a {
    color: rgba(0, 0, 0, 0.65);
  }
`;
export const GridCard = styled(Card.Grid)`
  width: 20%;
  padding: 0;
  text-align: center;
  box-shadow: none;
  line-height: 50px;
`;
export const AvatarIcon = styled(Avatar)`
  margin-top: -5px;
`;
export const Nickname = styled.span`
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
  @media only screen and (max-width: 576px) {
    display: none;
  }
`;
export const Span = styled.span`
  color: #1890ff;
  padding-left: 10px;
  @media only screen and (max-width: 576px) {
    padding-left: 0px;
    display: block;
    line-height: 0px;
    padding-bottom: 20px;
  }
`;
