import React from 'react';
import { Row, Col } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import LoginForm from '../containers/LoginForm';
import UserProfile from '../containers/UserProfile';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { HeadBox, Header, SearchBar, MenuItem, SearchMenu } from './Styles';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const onSearch = (value) => {
    Router.push(
      { pathname: '/hashtag', query: { tag: value } },
      `/hashtag/${value}`,
    );
  };
  return (
    <>
      <HeadBox>
        <Col xs={24} md={13}>
          <Header mode="horizontal">
            <MenuItem key="home">
              <Link href="/">
                <a>ReactSNS</a>
              </Link>
            </MenuItem>
            <MenuItem key="profile">
              <Link href="/profile" prefetch>
                <a>Profile</a>
              </Link>
            </MenuItem>
            <SearchMenu key="mail">
              <SearchBar enterButton onSearch={onSearch} />
            </SearchMenu>
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

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
