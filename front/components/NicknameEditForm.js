import React from 'react';
import { Button, Input, Form } from 'antd';
import styled from 'styled-components';

const NicknameForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;

  button {
    width: 19%;
    margin-left: 1%;
    top: 1px;
  }
`;

const NicknameInput = styled(Input)`
  width: 80%;
`;

const NicknameEditForm = () => {
  return (
    <NicknameForm>
      <NicknameInput addonBefore="닉네임" />
      <Button type="primary">수정</Button>
    </NicknameForm>
  );
};

export default NicknameEditForm;
