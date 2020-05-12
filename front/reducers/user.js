import produce from 'immer';

export const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
  loadUserErrorReason: '', // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 사유
  me: null, // 내 정보
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  idError: false, // 아이디 중복 검사 실패 사유
  userInfo: null, // 남의 정보
  isEditingNickname: false, // 이름 변경 중
  editNicknameErrorReasion: '', // 이름 변경 실패 사유
  hasMoreFollowing: false, // 남은 팔로잉 목록 여부
  hasMoreFollower: false, // 남은 팔로워 목록 여부
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHECK_ID_REQUEST = 'CHECK_ID_REQUEST';
export const CHECK_ID_SUCCESS = 'CHECK_ID_SUCCESS';
export const CHECK_ID_FAILURE = 'CHECK_ID_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; // 액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'; // 액션의 이름
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'; // 액션의 이름

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true;
        draft.logInErrorReason = '';
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.logInErrorReason = action.error;
        draft.me = null;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLoggingOut = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.me = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.isLoggingOut = false;
        break;
      }
      case CHECK_ID_REQUEST: {
        draft.idError = false;
        break;
      }
      case CHECK_ID_SUCCESS: {
        draft.idError = action.data === 0 ? false : true;
        break;
      }
      case CHECK_ID_FAILURE: {
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.isSigningUp = true;
        draft.isSignedUp = false;
        draft.signUpErrorReason = '';
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSigningUp = false;
        draft.isSignedUp = true;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSigningUp = false;
        draft.signUpErrorReason = action.error;
        break;
      }
      case LOAD_USER_REQUEST: {
        draft.loadUserErrorReason = '';
        break;
      }
      case LOAD_USER_SUCCESS: {
        if (action.me) {
          draft.me = action.data;
          break;
        }
        draft.userInfo = action.data;
        break;
      }
      case LOAD_USER_FAILURE: {
        draft.loadUserErrorReason = action.error;
        break;
      }
      case FOLLOW_USER_REQUEST: {
        break;
      }
      case FOLLOW_USER_SUCCESS: {
        draft.me.following.unshift(action.data);
        break;
      }
      case FOLLOW_USER_FAILURE: {
        break;
      }
      case UNFOLLOW_USER_REQUEST: {
        break;
      }
      case UNFOLLOW_USER_SUCCESS: {
        const index = draft.me.following.findIndex(
          (v) => parseInt(v) === action.data,
        );
        draft.me.following.splice(index, 1);
        const listIndex = draft.followingList.findIndex((v) => v.id === action);
        draft.followingList.splice(listIndex, 1);
      }
      case UNFOLLOW_USER_FAILURE: {
        break;
      }
      case ADD_POST_TO_ME: {
        draft.me.post.unshift(action.data);
        break;
      }
      case REMOVE_POST_OF_ME: {
        const index = draft.me.post.findIndex(
          (v) => parseInt(v) === action.data,
        );
        draft.me.post.splice(index, 1);
        break;
      }
      case LOAD_FOLLOWERS_REQUEST: {
        draft.followerList = !action.offset ? [] : draft.followerList;
        draft.hasMoreFollower = action.offset ? draft.hasMoreFollower : true;
        break;
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        action.data.forEach((d) => {
          draft.followerList.push(d);
        });
        draft.hasMoreFollower = action.data.length === 3;
        break;
      }
      case LOAD_FOLLOWERS_FAILURE: {
        break;
      }
      case LOAD_FOLLOWINGS_REQUEST: {
        draft.followingList = !action.offset ? [] : draft.followingList;
        draft.hasMoreFollowing = action.offset ? draft.hasMoreFollowing : true;
        break;
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        action.data.forEach((d) => {
          draft.followingList.push(d);
        });
        draft.hasMoreFollowing = action.data.length === 3;
        break;
      }
      case LOAD_FOLLOWINGS_FAILURE: {
        break;
      }
      case REMOVE_FOLLOWER_REQUEST: {
        break;
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        const index = draft.me.follower.findIndex(
          (v) => parseInt(v) === action.data,
        );
        draft.me.follower.splice(index, 1);
        const listIndex = draft.followerList.findIndex((v) => v.id === action);
        draft.followerList.splice(listIndex, 1);
        break;
      }
      case REMOVE_FOLLOWER_FAILURE: {
        break;
      }
      case EDIT_NICKNAME_REQUEST: {
        draft.isEditingNickname = true;
        draft.editNicknameErrorReasion = '';
        break;
      }
      case EDIT_NICKNAME_SUCCESS: {
        draft.isEditingNickname = false;
        draft.me.nickname = action.data;
        break;
      }
      case EDIT_NICKNAME_FAILURE: {
        draft.isEditingNickname = false;
        draft.editNicknameErrorReasion = action.error;
        break;
      }
      default: {
        break;
      }
    }
  });
};
