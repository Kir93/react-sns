import React from 'react';
import { Menu, Input, Row, Col } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { LOAD_USER_REQUEST } from '../reducers/user';

const middleAlign = 'vertical-align: middle;';
const SearchBar = styled(Input.Search)`
  ${middleAlign}
`;

const HeadBox = styled(Row)`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 50px;
`;

const Header = styled(Menu)`
  border-bottom: 0;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!me) {
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
  }, []);

  return (
    <>
      <HeadBox>
        <Col xs={24} md={13}>
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
        <Col xs={24} md={11}>
          {me ? <UserProfile /> : <LoginForm />}
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
