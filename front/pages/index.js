import React from 'react';
import { Form, Input, Button, Card, Avatar, Icon } from 'antd';
import styled from 'styled-components';
const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: '키르',
      },
      content: '첫 번째 게시글',
      img: `https://dimg.donga.com/wps/NEWS/IMAGE/2019/12/22/98915688.2.jpg`,
    },
  ],
};

const PostBtn = styled(Button)`
  float: right;
`;
const PostImg = styled.img`
  width: 200px;
`;

const InputPost = styled(Form)`
  margin-bottom: 30px;
`;

const Home = () => {
  return (
    <>
      {dummy.isLoggedIn && (
        <InputPost encType="multiple">
          <Input.TextArea
            maxLength={140}
            placeholder="당신의 일상을 기록하세요."
          />
          <div>
            <input type="text" multiple hidden />
            <Button>이미지 업로드</Button>
            <PostBtn type="primary" htmlType="submit">
              POST
            </PostBtn>
          </div>
          <div>
            {dummy.imagePaths.map((v, i) => {
              return (
                <div key={v} style={{ display: 'inline-block' }}>
                  <PostImg src={`http://localhost:3065/` + v} alt={v} />
                  <div>
                    <Button>제거</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </InputPost>
      )}
      {dummy.mainPosts.map((c) => {
        return (
          <Card
            key={+c.createdAt}
            cover={c.img && <img alt="example" src={c.img} />}
            actions={[
              <Icon type="retweet" key="retweet" />,
              <Icon type="heart" key="heart" />,
              <Icon type="message" key="message" />,
              <Icon type="ellipsis" key="ellipsis" />,
            ]}
            extra={<Button>팔로우</Button>}
          >
            <Card.Meta
              avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
              title={c.User.nickname}
              description={c.content}
            />
          </Card>
        );
      })}
    </>
  );
};
export default Home;
