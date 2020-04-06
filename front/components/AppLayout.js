import React from 'react';
import { Menu, Input, Form, Button } from 'antd';
import styled from 'styled-components';
const middleAlign = 'vertical-align: middle;';
const SearchBar = styled(Input.Search)`
  ${middleAlign}
`;

const Header = styled(Menu)`
  padding: 0 100px;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

const Signup = styled(Button)`
  margin-left: 5px;
  ${middleAlign}
`;

const Login = styled(Button)`
  ${middleAlign}
`;

const LoginMenu = styled(Menu.Item)`
  float: right;
  padding-top: 5px;
`;
const Inputbox = styled(Input)`
  ${middleAlign}
`;

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header mode="horizontal">
        <Menu.Item key="home">ReactSNS</Menu.Item>
        <Menu.Item key="profile">Profile</Menu.Item>
        <Menu.Item key="home">
          <SearchBar enterButton />
        </Menu.Item>
        <LoginMenu key="login">
          <Form layout="inline">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Inputbox placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Inputbox type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Login type="primary" htmlType="submit">
                LOGIN
              </Login>
              <Signup htmlType="submit">SIGNUP</Signup>
            </Form.Item>
          </Form>
        </LoginMenu>
      </Header>
      {children}
    </div>
  );
};

export default AppLayout;
