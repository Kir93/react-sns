import Axios from 'axios';
import { all, delay, fork, put, call, takeLatest } from 'redux-saga/effects';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from '../reducers/post';

function addPostAPI(addPostData) {
  return Axios.post('post/', addPostData);
}

function* addPost(action) {
  try {
    console.log(action);
    const result = yield call(addPostAPI, action.data);
    if (result.data == 0) {
      yield put({
        type: ADD_POST_FAILURE,
        error: alert('에러가 발생했습니다.'),
      });
    } else {
      yield put({
        type: ADD_POST_SUCCESS,
      });
    }
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: alert(e),
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentAPI() {}

function* addComment(action) {
  try {
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
      },
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
