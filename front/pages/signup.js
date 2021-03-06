import React, { useState, useCallback } from 'react';
import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { SIGN_UP_REQUEST, CHECK_ID_REQUEST } from '../reducers/user';
import { useEffect } from 'react';
import { SignupForm, InputDiv, CheckDiv, ButtonDiv } from './Styles';

export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const signup = () => {
  const [nickname, onChangeNickname] = useInput('');

  const [id, setId] = useState('');
  const [idOk, setIdOk] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordOk, setPasswordOk] = useState(false);

  const dispatch = useDispatch();
  const { isSigningUp, me, idError } = useSelector((state) => state.user);

  useEffect(() => {
    if (me) {
      alert('로그인 된 사용자는 접근 할 수 없는 페이지 입니다.');
      Router.push('/');
    }
  }, [me && me.id]);

  const isEnabled = useCallback(() => {
    if (passwordError || idError) {
      return true;
    }
    if (id && nickname && password && passwordCheck) {
      return false;
    }
    return true;
  }, [id, nickname, password, passwordCheck, passwordError, idError]);

  const onCheckId = useCallback(() => {
    dispatch({
      type: CHECK_ID_REQUEST,
      data: {
        userId: id,
      },
    });
  }, [id]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          userId: id,
          nickname,
          password,
        },
      });
    },
    [id, nickname, password, passwordCheck],
  );

  const onChangeId = useCallback(
    (e) => {
      const idReg = /^[a-z]+[a-z0-9]{5,12}$/g;
      setIdOk(!idReg.test(e.target.value));
      setId(e.target.value);
    },
    [id],
  );
  const onChangePassword = useCallback(
    (e) => {
      const passwordReg = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/g;
      setPasswordOk(!passwordReg.test(e.target.value));
      setPassword(e.target.value);
    },
    [password],
  );
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [passwordCheck],
  );
  if (me) {
    return null;
  }
  return (
    <>
      <SignupForm onSubmit={onSubmit}>
        <InputDiv>
          <label htmlFor="user-id">아이디</label>
          <Input
            value={id}
            name="user-id"
            required
            onChange={onChangeId}
            onBlur={onCheckId}
          />
          {idError && <CheckDiv>중복된 아이디가 있습니다.</CheckDiv>}
          {idOk && (
            <CheckDiv>
              아이디는 소문자로 시작하는 6~12자 영문자 또는 숫자이어야 합니다.
            </CheckDiv>
          )}
        </InputDiv>
        <InputDiv>
          <label htmlFor="user-nickname">닉네임</label>
          <Input
            value={nickname}
            name="user-nickname"
            required
            onChange={onChangeNickname}
          />
        </InputDiv>
        <InputDiv>
          <label htmlFor="user-password">비밀번호</label>
          <Input
            value={password}
            name="user-password"
            type="password"
            required
            onChange={onChangePassword}
          />
        </InputDiv>
        <InputDiv>
          <label htmlFor="user-password-chk">비밀번호체크</label>
          <Input
            value={passwordCheck}
            name="user-password-check"
            type="password"
            required
            onChange={onChangePasswordCheck}
          />
          {passwordOk && (
            <CheckDiv>
              비밀번호는 8~16자 이내의 영문, 숫자, 특수문자의 조합으로
              입력해주세요.
            </CheckDiv>
          )}
          {passwordError && <CheckDiv>비밀번호가 일치하지 않습니다.</CheckDiv>}
        </InputDiv>
        <ButtonDiv>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isSigningUp}
            disabled={isEnabled()}
          >
            가입하기
          </Button>
        </ButtonDiv>
      </SignupForm>
    </>
  );
};

export default signup;
