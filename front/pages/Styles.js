import styled from 'styled-components';
import { List, Button, Input, Form } from 'antd';

//profile.js
export const ProfileList = styled(List)`
  margin-bottom: 20px;
  text-align: center;
`;
export const More = styled(Button)`
  width: 100%;
`;
export const ListItem = styled(List.Item)`
  margin-top: 20px;
`;

//signup.js
export const SignupForm = styled(Form)`
  padding: 30px;
`;
export const InputDiv = styled.div`
  margin-bottom: 20px;
  & label {
    font-weight: bold;
  }
  & input {
    margin-top: 10px;
  }
`;
export const CheckDiv = styled.div`
  color: red;
`;
export const ButtonDiv = styled.div`
  margin-top: 10px;
  .ant-btn {
    width: 100%;
  }
  .ant-btn-lg {
    height: 60px;
    font-weight: bold;
  }
`;
