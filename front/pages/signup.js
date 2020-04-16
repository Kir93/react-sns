import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useEffect } from 'react';

const Label = styled.label`
  font-weight: bold;
`;

const SignupInput = styled(Input)`
  margin-top: 10px;
`;

const SignupForm = styled(Form)`
  padding: 30px;
`;
const CheckDiv = styled.div`
  color: red;
`;
const ButtonDiv = styled.div`
  margin-top: 10px;

  .ant-btn {
    width: 100%;
  }

  .ant-btn-lg {
    height: 60px;
    font-weight: bold;
  }
`;

const InputDiv = styled.div`
  margin-bottom: 20px;
`;

export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const signup = () => {
  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const { isSigningUp, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me) {
      alert('로그인 된 사용자는 접근 할 수 없는 페이지 입니다.');
      Router.push('/');
    }
  }, [me && me.id]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          id,
          password,
          nickname,
        },
      });
    },
    [password, passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [passwordCheck],
  );

  return (
    <>
      <SignupForm onSubmit={onSubmit}>
        <InputDiv>
          <Label htmlFor="user-id">아이디</Label>
          <SignupInput
            value={id}
            name="user-id"
            required
            onChange={onChangeId}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="user-nickname">닉네임</Label>
          <SignupInput
            value={nickname}
            name="user-nickname"
            required
            onChange={onChangeNickname}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="user-password">비밀번호</Label>
          <SignupInput
            value={password}
            name="user-password"
            type="password"
            required
            onChange={onChangePassword}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="user-password-chk">비밀번호체크</Label>
          <SignupInput
            value={passwordCheck}
            name="user-password-check"
            type="password"
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <CheckDiv>비밀번호가 일치하지 않습니다.</CheckDiv>}
        </InputDiv>
        <ButtonDiv>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isSigningUp}
          >
            가입하기
          </Button>
        </ButtonDiv>
      </SignupForm>
    </>
  );
};

export default signup;
