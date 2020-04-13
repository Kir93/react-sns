import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
const InputPost = styled(Form)`
  margin-bottom: 30px;
`;

const PostBtn = styled(Button)`
  float: right;
`;

const PostImg = styled.img`
  width: 200px;
`;

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);

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
        {imagePaths.map((v) => {
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
