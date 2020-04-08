import React from 'react';
import { Menu, Input, Form, Button, Row, Col, Avatar, Card } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const dummy = {
  nickname: 'Kir',
  Post: [],
  Followings: [],
  Followers: [],
};

const middleAlign = 'vertical-align: middle;';
const SearchBar = styled(Input.Search)`
  ${middleAlign}
`;
const GridCard = styled(Card.Grid)`
  width: 20%;
  padding: 0;
  text-align: center;
  box-shadow: none;
  line-height: 50px;
`;
const HeadBox = styled(Row)`
  border-bottom: 1px solid #e8e8e8;
`;

const Span = styled.span`
  color: #1890ff;
`;

const Header = styled(Menu)`
  border-bottom: 0;
`;

const Signup = styled(Button)`
  margin-left: 5px;
  ${middleAlign}
`;

const Login = styled(Button)`
  ${middleAlign}
`;
const LoginCard = styled(Card)`
  border: 0;
  margin-top: 5px;
  & .ant-card-body {
    padding: 0;
  }
`;
const LoginMenu = styled(Form)`
  padding-top: 5px;
`;
const Inputbox = styled(Input)`
  ${middleAlign}
`;

const AppLayout = ({ children }) => {
  return (
    <>
      <HeadBox>
        <Col xs={24} md={12}>
          <Header mode="horizontal">
            <Menu.Item key="home">
              <Link href="/">
                <a>ReactSNS</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="profile">
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="home">
              <SearchBar enterButton />
            </Menu.Item>
          </Header>
        </Col>
        <Col xs={24} md={12}>
          <LoginCard>
            <GridCard hoverable={false}>
              <Avatar>{dummy.nickname[0]}</Avatar>
            </GridCard>
            <GridCard>
              포스트 <Span>{dummy.Post.length}</Span>
            </GridCard>
            <GridCard>
              팔로잉 <Span>{dummy.Followings.length}</Span>
            </GridCard>
            <GridCard>
              팔로워 <Span>{dummy.Followers.length}</Span>
            </GridCard>
            <GridCard hoverable={false}>
              <Button>로그아웃</Button>
            </GridCard>
          </LoginCard>
          {/* <LoginMenu layout="inline">
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
              <Link href="/signup">
                <a>
                  <Signup htmlType="submit">SIGNUP</Signup>
                </a>
              </Link>
            </Form.Item>
          </LoginMenu> */}
        </Col>
      </HeadBox>
      <Row>
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </>
  );
};

AppLayout.PropTypes = {
  children: PropTypes.elementType,
};

export default AppLayout;
