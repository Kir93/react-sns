import React from 'react';
import { Menu, Input } from 'antd';
import styled from 'styled-components';

const SearchBar = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">ReactSNS</Menu.Item>
        <Menu.Item key="profile">Profile</Menu.Item>
        <Menu.Item key="home">
          <SearchBar enterButton />
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

export default AppLayout;
