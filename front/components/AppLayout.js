import React from 'react';
import { Menu, Input, Form, Button, Row, Col, Avatar, Card, Icon } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

const dummy = {
  nickname: 'Kir',
  Post: [],
  Followings: [],
  Followers: [],
  isLogedIn: false,
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
  margin-bottom: 50px;
`;

const Span = styled.span`
  color: #1890ff;
`;

const Header = styled(Menu)`
  border-bottom: 0;
`;
const LoginCard = styled(Card)`
  border: 0;
  margin-top: 5px;
  margin-right: 40px;
  & .ant-card-body {
    padding: 0;
  }
`;

const Inputbox = styled(Input)`
  ${middleAlign}
`;

const AppLayout = ({ children }) => {
  return (
    <>
      <HeadBox>
        <Col xs={24} md={dummy.isLogedIn ? 14 : 12}>
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
        <Col xs={24} md={dummy.isLogedIn ? 10 : 12}>
          {dummy.isLogedIn ? (
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
                <Button loading={false}>로그아웃</Button>
              </GridCard>
            </LoginCard>
          ) : (
            <LoginForm />
          )}
        </Col>
      </HeadBox>
      <Row>
        <Col xs={24} md={7}></Col>
        <Col xs={24} md={10}>
          {children}
        </Col>
        <Col xs={24} md={7}></Col>
      </Row>
    </>
  );
};

AppLayout.PropTypes = {
  children: PropTypes.elementType,
};

export default AppLayout;
