import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';

const SignupForm = styled(Form)`
  padding: 30px;
`;
const CheckDiv = styled.div`
  color: red;
`;
const ButtonDiv = styled.div`
  margin-top: 10px;
`;
const signup = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
    },
    [password, passwordCheck],
  );
  const onChangeId = useCallback(
    (e) => {
      setId(e.target.value);
    },
    [id],
  );
  const onChangeNickname = useCallback(
    (e) => {
      setNickname(e.target.value);
    },
    [nickname],
  );
  const onChangePassword = useCallback(
    (e) => {
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

  return (
    <>
      <SignupForm onSubmit={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input value={id} name="user-id" required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            value={nickname}
            name="user-nickname"
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            value={password}
            name="user-password"
            type="password"
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-chk">비밀번호체크</label>
          <br />
          <Input
            value={passwordCheck}
            name="user-password-check"
            type="password"
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <CheckDiv>비밀번호가 일치하지 않습니다.</CheckDiv>}
        </div>
        <ButtonDiv>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </ButtonDiv>
      </SignupForm>
    </>
  );
};

export default signup;
