import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

const InputPost = styled(Form)`
  margin-bottom: 30px;
`;

const PostBtn = styled(Button)`
  float: right;
`;

const PostImg = styled.img`
  width: 200px;
`;

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

const PostForm = () => {
  return (
    <InputPost encType="multiple">
      <Input.TextArea maxLength={140} placeholder="당신의 일상을 기록하세요." />
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
  );
};

export default PostForm;
