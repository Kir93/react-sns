import {
  all,
  fork,
  put,
  takeEvery,
  takeLatest,
  call,
} from 'redux-saga/effects';
import Router from 'next/router';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOG_OUT_SUCCESS,
  LOG_OUT_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOG_OUT_FAILURE,
  CHECK_ID_REQUEST,
  CHECK_ID_SUCCESS,
  CHECK_ID_FAILURE,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_SUCCESS,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE,
  EDIT_NICKNAME_REQUEST,
} from '../reducers/user';

function loginAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/login', loginData, {
    withCredentials: true,
  });
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/', signUpData);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    alert('회원가입에 성공하셨습니다.');
    yield put({
      // put은 dispatch 동일
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
    Router.push('/');
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function logoutAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/logout', {}, { withCredentials: true });
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      // put은 dispatch 동일
      type: LOG_OUT_SUCCESS,
    });
    Router.push('/');
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOG_OUT_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logout);
}

function loadUserAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.get(userId ? `/user/${userId}/` : '/user/', {
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function checkIdAPI(checkIdData) {
  return axios.post('/user/checkId', checkIdData);
}

function* checkId(action) {
  try {
    const result = yield call(checkIdAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: CHECK_ID_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: CHECK_ID_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchCheckId() {
  yield takeLatest(CHECK_ID_REQUEST, checkId);
}

function unfollowAPI(userId) {
  return axios.delete(`/user/${userId}/follow`, { withCredentials: true });
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_USER_REQUEST, unfollow);
}

function followAPI(userId) {
  return axios.post(`/user/${userId}/follow`, {}, { withCredentials: true });
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_USER_REQUEST, follow);
}

function loadFollowingsAPI(userId, offset = 0, limit = 3) {
  return axios.get(
    `/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`,
    { withCredentials: true },
  );
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data, action.offset);
    yield put({
      // put은 dispatch 동일
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function loadfollowersAPI(userId, offset = 0, limit = 3) {
  return axios.get(
    `/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`,
    { withCredentials: true },
  );
}

function* loadfollowers(action) {
  try {
    const result = yield call(loadfollowersAPI, action.data, action.offset);
    yield put({
      // put은 dispatch 동일
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadfollowers);
}

function removeFollowerAPI(userId) {
  return axios.delete(`/user/${userId}/follower`, { withCredentials: true });
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI(nickname) {
  return axios.patch(`/user/nickname`, { nickname }, { withCredentials: true });
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e.response ? e.response.data : e.message,
    });
  }
}

function* watchEditNickname() {
  yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchCheckId),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchUnfollow),
    fork(watchFollow),
    fork(watchLoadFollowings),
    fork(watchLoadFollowers),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
  ]);
}
