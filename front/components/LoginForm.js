import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Form, Input, Button, Icon } from 'antd';
import { useInput } from '../pages/signup';
import { useCallback } from 'react';

const middleAlign = 'vertical-align: middle;';

const LoginMenu = styled(Form)`
  padding-top: 5px;
  text-align: center;
`;

const Signup = styled(Button)`
  margin-left: 5px;
  ${middleAlign}
`;

const Login = styled(Button)`
  ${middleAlign}
`;

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(id, password);
    },
    [id, password],
  );
  return (
    <LoginMenu layout="inline" onSubmit={onSubmitForm}>
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="UserId"
          value={id}
          onChange={onChangeId}
          required
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </Form.Item>
      <Form.Item>
        <Login type="primary" htmlType="submit" loading={false}>
          LOGIN
        </Login>
        <Link href="/signup">
          <a>
            <Signup htmlType="submit">SIGNUP</Signup>
          </a>
        </Link>
      </Form.Item>
    </LoginMenu>
  );
};

export default LoginForm;
