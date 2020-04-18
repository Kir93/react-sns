import { all, delay, fork, put, takeEvery, call } from 'redux-saga/effects';
import Router from 'next/router';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/login');
}

function* login() {
  try {
    // yield call(loginAPI);
    yield delay(2000);
    yield put({
      // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  axios.post('http://localhost:3065/api/user/', signUpData).then((res) => {
    console.log(res);
    if (res.data === 1) {
      alert('회원가입에 성공하셨습니다.');
      Router.push('/');
    } else {
      alert('회원가입에 실패하셨습니다.');
    }
  });
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)]);
}
