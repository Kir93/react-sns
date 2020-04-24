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
    if (result.data.id > 0) {
      return yield put({
        // put은 dispatch 동일
        type: LOG_IN_SUCCESS,
        data: result.data,
      });
    } else {
      alert('로그인에 실패하셨습니다.');
      return yield put({
        // put은 dispatch 동일
        type: LOG_IN_FAILURE,
        error: result.data,
      });
    }
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      error: e,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user', signUpData);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    if (result.data === 0) {
      alert('회원가입에 실패하셨습니다.');
      return yield put({
        // put은 dispatch 동일
        type: SIGN_UP_FAILURE,
      });
    }
    if (result.data >= 1) {
      alert('회원가입에 성공하셨습니다.');
      yield put({
        // put은 dispatch 동일
        type: SIGN_UP_SUCCESS,
      });
      Router.push('/');
    }
  } catch (e) {
    // loginAPI 실패
    console.log(result.data);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
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
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
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
    // loginAPI 실패
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
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
      error: e,
    });
  }
}

function* watchCheckId() {
  yield takeLatest(CHECK_ID_REQUEST, checkId);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchCheckId),
    fork(watchLogout),
    fork(watchLoadUser),
  ]);
}
