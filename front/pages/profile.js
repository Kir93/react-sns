import React from 'react';
import { Form, Input, List, Button, Card, Icon } from 'antd';
import styled from 'styled-components';

const NicknameForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;

  button {
    width: 19%;
    margin-left: 1%;
    top: 1px;
  }
`;

const NicknameInput = styled(Input)`
  width: 80%;
`;

const ProfileList = styled(List)`
  margin-bottom: 20px;
  text-align: center;
`;

const More = styled(Button)`
  width: 100%;
  // border: 0;
  // border-top: 1px solid #d9d9d9;
`;

const ListItem = styled(List.Item)`
  margin-top: 20px;
`;

const profile = () => {
  return (
    <div>
      <NicknameForm>
        <NicknameInput addonBefore="닉네임" />
        <Button type="primary">수정</Button>
      </NicknameForm>
      <ProfileList
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<More>더보기</More>}
        bordered
        dataSource={['키르', '팔로잉', '팔로워']}
        renderItem={(item) => (
          <ListItem>
            <Card actions={[<Icon key="stop" type="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </ListItem>
        )}
      />
      <ProfileList
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<More>더보기</More>}
        bordered
        dataSource={['키르', '팔로잉', '팔로워']}
        renderItem={(item) => (
          <ListItem>
            <Card actions={[<Icon key="stop" type="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </ListItem>
        )}
      />
    </div>
  );
};

export default profile;
