import React from 'react';
import { Button, Input, Form } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

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
  const dispatch = useDispatch();
  const { me, isEditingNickname } = useSelector((state) => state.user);
  const [editedName, setEditedName] = useState(me ? me && me.nickname : '');

  const onChangeNickname = useCallback(
    (e) => {
      setEditedName(e.target.value);
    },
    [editedName, me && me.nickname],
  );
  const onEditNickname = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: EDIT_NICKNAME_REQUEST,
        data: editedName,
      });
    },
    [editedName],
  );
  return (
    <NicknameForm onSubmit={onEditNickname}>
      <NicknameInput
        addonBefore="닉네임"
        value={editedName}
        onChange={onChangeNickname}
      />
      <Button type="primary" htmlType="submit" loading={isEditingNickname}>
        수정
      </Button>
    </NicknameForm>
  );
};

export default NicknameEditForm;
