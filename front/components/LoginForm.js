import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Form, Input, Button, Icon } from 'antd';
import { useInput } from '../pages/signup';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';

const middleAlign = 'vertical-align: middle;';

const LoginMenu = styled(Form)`
  padding-top: 5px;
  text-align: center;
`;

const InputFrom = styled(Form.Item)`
  @media only screen and (max-width: 576px) {
    display: block !important;
    margin-left: 16px;
  }
`;

const Signup = styled(Button)`
  margin-left: 5px;
  ${middleAlign}
  @media only screen and (max-width: 576px) {
    width: 49%;
    margin-bottom: 5px;
  }
`;

const Login = styled(Button)`
  ${middleAlign}
  @media only screen and (max-width: 576px) {
    width: 49%;
    margin-bottom: 5px;
  }
`;

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { isLoggingIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isEnabled = useCallback(() => {
    if (id && password) {
      return false;
    }
    return true;
  }, [id, password]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          id,
          password,
        },
      });
    },
    [id, password],
  );
  return (
    <LoginMenu layout="inline" onSubmit={onSubmitForm}>
      <InputFrom>
        <Input
          style={{ width: '100%' }}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="UserId"
          value={id}
          onChange={onChangeId}
          required
        />
      </InputFrom>
      <InputFrom>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </InputFrom>
      <InputFrom>
        <Login
          type="primary"
          htmlType="submit"
          loading={isLoggingIn}
          disabled={isEnabled()}
        >
          LOGIN
        </Login>
        <Link href="/signup">
          <a>
            <Signup htmlType="submit">SIGNUP</Signup>
          </a>
        </Link>
      </InputFrom>
    </LoginMenu>
  );
};

export default LoginForm;
