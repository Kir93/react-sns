import React from 'react';
import { Button, Input, Form } from 'antd';
import { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';
import { NicknameForm, NicknameInput } from './Styles';

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
