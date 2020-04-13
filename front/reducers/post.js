export const initialState = {
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
  imagePaths: [],
};

const ADD_POST = 'ADD_POST';
const ADD_DUMMY = 'ADD_DUMMY';

const addPost = {
  type: ADD_POST,
};

const addDummy = {
  type: ADD_DUMMY,
  data: {
    content: 'Hello ReactSNS',
    UserId: 1,
    User: {
      nickname: '키르',
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
      };
    }
    case ADD_DUMMY: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
